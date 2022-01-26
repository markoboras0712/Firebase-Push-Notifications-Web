import { Link } from '@reach/router';
import { ReactComponent as Shape } from 'assets/Shape.svg';
import React from 'react';
import classes from './style/Contact.module.css';

interface Props {
  uid: string;
  userName: string;
  userPhoto: string;
}

export const Contact: React.FC<Props> = ({ uid, userName, userPhoto }) => {
  return (
    <Link
      to={`/messages/${uid}`}
      state={{ myState: uid }}
      className={classes.contact}
      key={uid}
    >
      <img src={userPhoto} alt="avatar" className={classes.contact__avatar} />

      <span className={classes.contact__userName}>{userName}</span>
      <button type="button" className={classes.contact__shape}>
        <Shape />
      </button>
    </Link>
  );
};
