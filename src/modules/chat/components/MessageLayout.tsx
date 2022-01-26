import classes from './style/MessageLayout.module.css';
import {
  MessageHeader,
  MessageBody,
  MessageFooter,
  useContact,
  useMessages,
  selectAllMessages,
  clearMessages,
} from 'modules/chat';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from '@reach/router';

export const MessageLayout: React.FC = () => {
  const { getMessages, findIdOfChat } = useMessages();
  const location = useLocation<{ myState: 'value' }>();
  const layoutId = location.state.myState;
  const idOfChat = findIdOfChat(layoutId);
  const dispatch = useDispatch();

  const { maxDate, findUser } = useContact();
  const { userName, userPhoto } = findUser(layoutId);
  const messages = useSelector(selectAllMessages);

  useEffect(() => {
    if (idOfChat) {
      getMessages(idOfChat);
    }
    dispatch(clearMessages());
  }, [idOfChat]);

  return (
    <div className={classes.container}>
      <MessageHeader uid={layoutId} userName={userName} userPhoto={userPhoto} />
      {maxDate && <p className={classes.message__date}>{maxDate}</p>}
      <MessageBody messages={messages} />
      <MessageFooter uid={layoutId} />
    </div>
  );
};
