import { useSelector } from 'react-redux';
import classes from './style/MessageBody.module.css';
import { selectUser } from 'modules/authentication';
import { Message } from 'modules/chat';
import React, { useEffect, useRef } from 'react';

interface Props {
  messages: Message[];
}

export const MessageBody: React.FC<Props> = ({ messages }) => {
  const user = useSelector(selectUser);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={classes.messages}>
      {messages.map(({ text, uid, id, createdAt }, index) => (
        <div key={id}>
          <div
            className={` ${uid === user.id ? classes.sent : classes.received} ${
              messages[index]?.uid !== messages[index - 1]?.uid
                ? classes.first
                : ''
            } ${
              messages[index]?.uid !== messages[index + 1]?.uid &&
              messages[index]?.uid === messages[index - 1]?.uid
                ? classes.last
                : ''
            }`}
          >
            {text}
          </div>
          <p
            className={`${
              uid === user.id ? classes.time__sent : classes.time__received
            } ${
              messages[index]?.uid === messages[index + 1]?.uid
                ? classes.hidetime
                : ''
            }
            `}
          >
            {createdAt?.getHours() +
              ':' +
              ('0' + createdAt?.getMinutes()).slice(-2)}
          </p>
          <div ref={messagesEndRef}></div>
        </div>
      ))}
    </div>
  );
};
