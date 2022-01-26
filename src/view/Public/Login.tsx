import { PublicAuthGuard, SignIn } from 'modules/authentication';

export const Login: React.FC = () => (
  <PublicAuthGuard>
    <SignIn />
  </PublicAuthGuard>
);
