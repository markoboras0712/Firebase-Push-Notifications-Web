import { Layout } from 'components';
import { PrivateAuthGuard } from 'modules/authentication';
import { MessageList } from 'modules/chat';

export const AllMessages: React.FC = () => {
  return (
    <PrivateAuthGuard>
      <Layout>
        <MessageList />
      </Layout>
    </PrivateAuthGuard>
  );
};
