import classes from './style/MessageHeader.module.css';
import { ReactComponent as Arrow } from 'assets/arrow.svg';
import { ReactComponent as Dots } from 'assets/dots.svg';
import { navigate } from '@reach/router';
import React from 'react';

interface Props {
  uid: string;
  userName: string;
  userPhoto: string;
}

export const MessageHeader: React.FC<Props> = ({ userName, userPhoto }) => {
  const firstName = userName?.split(' ')?.[0];
  const lastName = userName?.split(' ')?.[1];

  return (
    <>
      <header className={classes.header}>
        <button onClick={() => navigate(-1)}>
          <Arrow />
        </button>

        <div className={classes.header__photo}>
          <img
            src={userPhoto}
            alt="Avatar"
            className={classes.header__avatar}
          />
        </div>
        <div className={classes.header__userName}>
          <p className={classes.header__firstName}>{firstName}</p>
          <p className={classes.header__lastName}>{lastName}</p>
        </div>

        <button className={classes.header__dots}>
          <Dots />
        </button>
      </header>
      <hr className={classes.horizontal_line} />
    </>
  );
};
