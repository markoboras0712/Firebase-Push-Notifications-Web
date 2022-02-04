/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './style/MessageLayout.module.css';
import {
  MessageHeader,
  MessageBody,
  MessageFooter,
  useContact,
  useMessages,
  selectAllMessages,
  clearMessages,
  fetchMessagesFulfilled,
  fetchMessagesPending,
  Message,
} from 'modules/chat';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from '@reach/router';
import { httpsCallable } from 'firebase/functions';
import { functions } from 'modules/redux-store';

export const MessageLayout: React.FC = () => {
  const { getMessages, findIdOfChat } = useMessages();
  const location = useLocation<{ myState: 'value' }>();
  const layoutId = location.state.myState;
  const idOfChat = findIdOfChat(layoutId);
  const dispatch = useDispatch();

  const { findUser } = useContact();
  const { userName, userPhoto } = findUser(layoutId);
  const messages = useSelector(selectAllMessages);

  const getMessagesTest = httpsCallable(functions, 'getMessagesTest');

  useEffect(() => {
    if (idOfChat) {
      // getMessages(idOfChat);
      dispatch(fetchMessagesPending());
      getMessagesTest(idOfChat).then((result) => {
        console.log('Log clienta', result.data);
        dispatch(fetchMessagesFulfilled(result.data as Message[]));
      });
    }
    dispatch(clearMessages());
  }, [idOfChat]);

  return (
    <div className={classes.container}>
      <MessageHeader uid={layoutId} userName={userName} userPhoto={userPhoto} />
      <MessageBody messages={messages} />
      <MessageFooter uid={layoutId} />
    </div>
  );
};
