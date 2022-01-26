import React from 'react';
import classes from './style/Navigation.module.css';
import { ReactComponent as Dots } from 'assets/dots.svg';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, useAuthentication } from 'modules/authentication';
import { addKeyword } from 'modules/users';
import { navigate } from '@reach/router';
import { Routes } from 'fixtures';

export const Navigation: React.FC = () => {
  const user = useSelector(selectUser);
  const { logoutUser } = useAuthentication();
  const dispatch = useDispatch();
  const handleChange = (e: { target: { value: string } }) => {
    dispatch(addKeyword(e.target.value));
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <div>
          <img
            src={user.photoUrl as string}
            alt="Avatar"
            className={classes.header__avatar}
          />
        </div>
        <div className={classes.header__chats}>Chats</div>
        <Menu
          menuButton={
            <MenuButton className={classes.header__dots}>
              <Dots />
            </MenuButton>
          }
        >
          <MenuItem onClick={() => navigate(Routes.Messages)}>Inbox</MenuItem>
          <MenuItem onClick={() => navigate(Routes.Contacts)}>
            Contacts
          </MenuItem>
          <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
        </Menu>
      </div>
      <div className={classes.header__search}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search"
          className={classes.header__searchbar}
        />
      </div>
    </header>
  );
};
