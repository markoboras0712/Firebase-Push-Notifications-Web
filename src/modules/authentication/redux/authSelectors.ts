import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'modules/redux-store';

export const userSelector = (state: RootState) => state.auth;

export const selectUser = createDraftSafeSelector(
  userSelector,
  (user) => user.data,
);
export const selectUserLoading = createDraftSafeSelector(
  userSelector,
  (user) => user.isLoading,
);
export const selectUserError = createDraftSafeSelector(
  userSelector,
  (user) => user.error,
);

export const selectUserActiveChats = createDraftSafeSelector(
  userSelector,
  (user) => user.data.activeChats,
);
