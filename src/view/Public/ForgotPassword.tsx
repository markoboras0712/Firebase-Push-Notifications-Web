import { PublicAuthGuard, NewPasswordForm } from 'modules/authentication';

export const ForgotPassword: React.FC = () => (
  <PublicAuthGuard>
    <NewPasswordForm />
  </PublicAuthGuard>
);
