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
import { selectUser } from 'modules/authentication';
import { httpsCallable } from 'firebase/functions';
import { functions } from 'modules/redux-store';
import { accessRegistrationToken } from 'modules/redux-store/messaging';
import { selectAllOtherUsers } from 'modules/users';

interface Props {
  uid: string;
}

export const MessageFooter: React.FC<Props> = ({ uid }) => {
  const { findIdOfChat } = useMessages();
  const auth = useSelector(selectUser);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const helloWorldTest = httpsCallable(functions, 'helloWorld');
  const idOfChat = findIdOfChat(uid);

  const allOtherUsers = useSelector(selectAllOtherUsers);

  useEffect(() => {
    if (!idOfChat) {
      const message: Message = {
        to: uid,
        uid: auth.id,
      };
      dispatch(createNewChat(message));
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
    dispatch(sendNewMessage(message));
    const token = await accessRegistrationToken();
    const otherUserFcmTokenTest = allOtherUsers.find(
      (user) => user.uid === uid,
    );
    console.log('Other user test', otherUserFcmTokenTest?.fcmToken);
    const testMessage = {
      text: msg,
      to: uid,
      uid: auth.id,
      subCollection: idOfChat,
      fcmToken: token,
      otherUserFcmToken: otherUserFcmTokenTest?.fcmToken,
      displayName: auth.displayName,
    };

    console.log('Token test FCM', token);
    console.log('Test message frontend', testMessage);
    helloWorldTest(testMessage).then((result) => {
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
