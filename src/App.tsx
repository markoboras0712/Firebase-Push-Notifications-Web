/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';
import { AuthListener } from 'modules/authentication';
import { Routing } from 'modules/routing';
import { useEffect } from 'react';
import { accessRegistrationToken } from 'modules/redux-store/messaging';

export const App: React.FC = () => {
  return (
    <AuthListener>
      <Routing />
    </AuthListener>
  );
};
