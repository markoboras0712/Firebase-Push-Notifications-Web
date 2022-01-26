import { PrivateAuthGuard } from 'modules/authentication';
import { MessageLayout } from 'modules/chat';

export const Chat: React.FC = () => (
  <PrivateAuthGuard>
    <MessageLayout />
  </PrivateAuthGuard>
);
