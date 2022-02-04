/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './style/MessageFooter.module.css';
import { ReactComponent as Smiley } from 'assets/smiley.svg';
import { ReactComponent as Buttons } from 'assets/imgupload.svg';
import { ReactComponent as SendButton } from 'assets/send_svg.svg';
import {
  createNewChat,
  Message,
  sendNewMessage,
  useMessages,
} from 'modules/chat';
import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserChats } from 'modules/authentication';
import { httpsCallable } from 'firebase/functions';
import { functions } from 'modules/redux-store';

import { selectAllOtherUsers } from 'modules/users';

interface Props {
  uid: string;
}

export const MessageFooter: React.FC<Props> = ({ uid }) => {
  const { findIdOfChat } = useMessages();
  const auth = useSelector(selectUser);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const idOfChat = findIdOfChat(uid);

  const allOtherUsers = useSelector(selectAllOtherUsers);
  const sendMessageTest = httpsCallable(functions, 'sendMessage');
  const createNewChatTest = httpsCallable(functions, 'createNewChatTest');

  useEffect(() => {
    if (!idOfChat) {
      const message: Message = {
        to: uid,
        uid: auth.id,
      };
      // dispatch(createNewChat(message));

      createNewChatTest(message).then((result) => {
        console.log('Log clienta', result.data);
        dispatch(updateUserChats(message.uid));
      });
    }
  }, []);

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    const message: Message = {
      text: msg,
      to: uid,
      uid: auth.id,
      subCollection: idOfChat,
    };
    const otherUserFcmTokenTest = allOtherUsers.find(
      (user) => user.uid === uid,
    );
    console.log('Other user test', otherUserFcmTokenTest?.fcmToken);
    const testMessage = {
      text: msg,
      to: uid,
      uid: auth.id,
      subCollection: idOfChat,
      fcmToken: auth.fcmToken,
      otherUserFcmToken: otherUserFcmTokenTest?.fcmToken,
      displayName: auth.displayName,
    };

    console.log('Token test FCM', auth.fcmToken);
    console.log('Test message frontend', testMessage);
    sendMessageTest(testMessage).then((result) => {
      console.log('Log', result.data);
    });
    setMsg('');
  };

  return (
    <div className={classes.sticky}>
      <hr className={classes.horizontal_line} />
      <form onSubmit={sendMessage} className={classes.footer}>
        <button type="button" className={classes.footer__smiley} disabled>
          <Smiley />
        </button>

        <input
          placeholder="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className={classes.footer__input}
        />
        <button type="submit" disabled={!msg}>
          {!msg.length ? <Buttons /> : <SendButton />}
        </button>
      </form>
    </div>
  );
};
