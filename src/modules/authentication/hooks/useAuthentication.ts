import {
  clearUser,
  Login,
  Register,
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  signInWithGoogle,
  signUpWithEmailPassword,
  getUser,
  saveUser,
} from 'modules/authentication';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'modules/redux-store';
import { navigate } from '@reach/router';
import { Routes } from 'fixtures';

export const useAuthentication = () => {
  const dispatch = useDispatch();

  const loginWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const loginWithEmailPassword = (data: Login) => {
    dispatch(signInWithEmailPassword(data));
  };

  const resetPassword = (email: string) => {
    dispatch(sendPasswordReset(email));
    navigate(Routes.Login);
  };

  const registerWithEmailPassword = (data: Register) => {
    dispatch(signUpWithEmailPassword(data));
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate(Routes.Login);
  };

  const autoLogin = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(getUser(user));
        dispatch(saveUser(user));
      }
      if (!user) {
        dispatch(clearUser());
      }
      return unsubscribe;
    });
  };

  return {
    loginWithGoogle,
    loginWithEmailPassword,
    resetPassword,
    registerWithEmailPassword,
    autoLogin,
    logoutUser,
  };
};
