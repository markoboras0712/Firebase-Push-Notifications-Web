import { Link } from '@reach/router';
import { selectUser, useAuthentication } from 'modules/authentication';
import { Routes } from 'fixtures';
import { useSelector } from 'react-redux';
import classes from './style/Modal.module.css';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

export const Modal = ({ setIsOpen }: Props) => {
  const user = useSelector(selectUser);
  const { logoutUser } = useAuthentication();
  return (
    <ul className={classes.modal__links} onClick={() => setIsOpen(false)}>
      <li className={classes.modal__item}>
        <Link to={Routes.Messages}>
          <button type="button" className={classes.modal__button}>
            Inbox
          </button>
        </Link>
      </li>
      <li className={classes.modal__item}>
        <Link to={Routes.Contacts}>
          <button type="button" className={classes.modal__button}>
            Contacts
          </button>
        </Link>
      </li>
      {user && (
        <li className={classes.modal__item}>
          <Link to={Routes.Login}>
            <button
              type="button"
              className={classes.modal__button}
              onClick={() => logoutUser()}
            >
              Logout
            </button>
          </Link>
        </li>
      )}
    </ul>
  );
};
