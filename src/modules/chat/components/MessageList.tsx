import { Contact } from 'modules/chat';
import classes from './style/ContactList.module.css';
import { useUsers } from 'modules/users';
import { useEffect } from 'react';

export const MessageList: React.FC = () => {
  const { filteredInbox, getAllInboxUsers } = useUsers();

  useEffect(() => {
    getAllInboxUsers();
  }, []);

  return (
    <div className={classes.container}>
      {filteredInbox.map(({ uid, userName, userPhoto }) => (
        <Contact
          key={uid}
          uid={uid}
          userName={userName}
          userPhoto={userPhoto}
        />
      ))}
    </div>
  );
};
