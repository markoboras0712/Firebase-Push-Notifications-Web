import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'modules/redux-store';

export const chatSelector = (state: RootState) => state.messages;

export const selectAllMessages = createDraftSafeSelector(
  chatSelector,
  (messages) => messages.allMessages,
);
export const selectAllMessagesLoading = createDraftSafeSelector(
  chatSelector,
  (messages) => messages.loading,
);
export const selectAllMessagesError = createDraftSafeSelector(
  chatSelector,
  (messages) => messages.error,
);
