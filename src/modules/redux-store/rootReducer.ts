import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from 'modules/authentication';
import { chatReducer } from 'modules/chat';
import { usersReducer } from 'modules/users';

export const rootReducer = combineReducers({
  messages: chatReducer,
  auth: authReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
