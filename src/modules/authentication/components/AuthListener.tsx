import { useEffect } from 'react';
import { useAuthentication } from 'modules/authentication';

export const AuthListener: React.FC = ({ children }) => {
  const { autoLogin } = useAuthentication();

  useEffect(() => {
    autoLogin();
  }, []);

  return <>{children}</>;
};
