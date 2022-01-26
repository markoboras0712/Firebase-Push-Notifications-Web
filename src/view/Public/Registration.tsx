import { PublicAuthGuard, SignUp } from 'modules/authentication';

export const Registration: React.FC = () => (
  <PublicAuthGuard>
    <SignUp />
  </PublicAuthGuard>
);
