import { Link, navigate } from '@reach/router';
import { Routes } from 'fixtures';
import { useAuthentication, Login } from 'modules/authentication';
import { useCallback } from 'react';
import { ReactComponent as GoogleIcon } from 'assets/googleSVG.svg';
import { useForm } from 'react-hook-form';
import classes from './style/SignIn.module.css';
import '../../../App.css';
import { Input, Button } from 'components';
import React from 'react';

export const SignIn: React.FC = () => {
  const { loginWithGoogle, loginWithEmailPassword } = useAuthentication();
  const { register, handleSubmit, formState } = useForm<Login>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    handleSubmit((data: Login) => {
      loginWithEmailPassword(data);
    }),
    [],
  );

  const passwordResetHandler = useCallback(
    () => navigate(Routes.ForgotPassword),
    [],
  );

  const handleGoogleLogin = useCallback(() => loginWithGoogle(), []);

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h1 className={classes.form__title}>Sign In</h1>
        <div>
          <Input
            type="email"
            required
            id="email"
            placeholder="Email address"
            {...register('email', { required: true })}
          />
          <Input
            type="password"
            required
            id="password"
            placeholder="Password"
            {...register('password', {
              required: true,
            })}
          />

          <Button
            type="submit"
            onClick={onSubmit}
            disabled={!formState.isValid}
          >
            Login
          </Button>
          <Button
            type="button"
            onClick={passwordResetHandler}
            disabled={!formState.isValid}
          >
            Forgot your password?
          </Button>

          <div className="form__google" onClick={handleGoogleLogin}>
            <div className="form__google__img">
              <GoogleIcon />
            </div>
            <span>Sign in with Google</span>
          </div>

          <div className={classes.form__actions}>
            <Link to={Routes.Register}>Don't have an account? Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
