import { Link } from '@reach/router';
import { Routes } from 'fixtures';
import { useAuthentication, Login } from 'modules/authentication';
import { useCallback } from 'react';
import { ReactComponent as GoogleIcon } from 'assets/googleSVG.svg';
import { useForm } from 'react-hook-form';
import classes from './style/SignIn.module.css';
import { Input, Button } from 'components';
import React from 'react';

export const NewPasswordForm: React.FC = () => {
  const { resetPassword, loginWithGoogle } = useAuthentication();
  const { register, handleSubmit, formState } = useForm<Login>({
    mode: 'onChange',
  });

  const passwordResetHandler = useCallback(
    handleSubmit((data: Login) => {
      resetPassword(data.email);
    }),
    [],
  );

  const handleGoogleLogin = () => loginWithGoogle();

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <h1 className={classes.form__title}>Forgot your password?</h1>
        <div>
          <Input
            type="email"
            required
            id="email"
            placeholder="Email address"
            {...register('email', { required: true })}
          />

          <Button
            type="button"
            onClick={passwordResetHandler}
            disabled={!formState.isValid}
          >
            Reset pasword
          </Button>

          <div className="form__google" onClick={handleGoogleLogin}>
            <div className="form__google__img">
              <GoogleIcon />
            </div>
            <span>Sign in with Google</span>
          </div>

          <div className={classes.form__actions}>
            <Link to={Routes.Login}>Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
