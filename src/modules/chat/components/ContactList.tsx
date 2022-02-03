/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getUser,
  selectUser,
  selectUserActiveChats,
  useAuthentication,
} from 'modules/authentication';
import { Contact } from 'modules/chat';
import { accessRegistrationToken } from 'modules/redux-store/messaging';
import { fetchUsers, useUsers } from 'modules/users';
import { httpsCallable } from 'firebase/functions';
import { functions } from 'modules/redux-store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './style/ContactList.module.css';

export const ContactList: React.FC = () => {
  const { filteredContacts } = useUsers();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { autoLogin } = useAuthentication();

  useEffect(() => {
    dispatch(fetchUsers(user.id));
    if (user.fcmToken === undefined || user.fcmToken === null) {
      autoLogin();
    }
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
