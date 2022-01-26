/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getUser,
  selectUser,
  selectUserActiveChats,
} from 'modules/authentication';
import { Contact } from 'modules/chat';
import { fetchUsers, useUsers } from 'modules/users';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './style/ContactList.module.css';

export const ContactList: React.FC = () => {
  const { filteredContacts } = useUsers();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUsers(user.id));
  }, []);

  return (
    <div className={classes.container}>
      {filteredContacts.map(({ uid, userName, userPhoto }) => (
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
