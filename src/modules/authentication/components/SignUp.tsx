/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from '@reach/router';
import {
  getFirestoreImageUrl,
  Register,
  useAuthentication,
} from 'modules/authentication';
import { ReactComponent as GoogleIcon } from 'assets/googleSVG.svg';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './style/SignIn.module.css';
import { Routes } from 'fixtures';
import { Input, Button } from 'components';
import React from 'react';

export const SignUp: React.FC = () => {
  const { registerWithEmailPassword, loginWithGoogle } = useAuthentication();
  const [uploadedImage, setUploadedImage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  const fileSelectHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const url = await getFirestoreImageUrl(
        event.target.files[0].name,
        event.target.files[0],
      );
      setUploadedImage(url);
    }
  };

  const onSubmit = handleSubmit((data: Register) => {
    if (uploadedImage === undefined) {
      alert('Upload picture');
    }
    registerWithEmailPassword({ ...data, photoUrl: uploadedImage });
  });

  const handleGoogleLogin = useCallback(() => loginWithGoogle(), []);

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h1 className={classes.form__title}>Sign Up</h1>
        <div>
          <Input
            type="text"
            required
            id="firstName"
            placeholder="First Name"
            {...register('firstName', { required: true })}
          />
          <p className={classes.form__error}>
            {' '}
            {errors.firstName?.type === 'required' && 'First name is required'}
          </p>

          <Input
            type="text"
            required
            id="lastName"
            placeholder="Last Name"
            {...register('lastName', { required: true })}
          />
          <p className={classes.form__error}>
            {errors.lastName?.type === 'required' && 'Last name is required'}
          </p>
          <Input
            type="email"
            required
            id="email"
            placeholder="Email address"
            {...register('email', { required: true })}
          />
          <p className={classes.form__error}>
            {errors.email?.type === 'required' && 'Email is required'}
          </p>
          <Input
            type="password"
            required
            id="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          <p className={classes.form__error}>
            {' '}
            {errors.password?.type === 'required' && 'Password is required'}
          </p>
          <Input type="file" id="userPhoto" onChange={fileSelectHandler} />
          <Button type="submit" onClick={onSubmit}>
            Register
          </Button>
          <div className="form__google" onClick={handleGoogleLogin}>
            <div className="form__google__img">
              <GoogleIcon />
            </div>
            <span>Sign in with Google</span>
          </div>
          <div className={classes.form__actions}>
            <Link to={Routes.Login}>Already have an account? Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
