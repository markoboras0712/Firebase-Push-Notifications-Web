import { AllMessages, Message } from 'modules/chat';
import { createNewChat } from 'modules/chat/redux/chatActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AllMessages = {
  allMessages: [],
  loading: false,
  error: '',
};

export const chatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessagesPending: (state) => {
      state.loading = true;
    },
    fetchMessagesFulfilled: (state, action: PayloadAction<Message[]>) => {
      state.allMessages = action.payload;
      state.loading = false;
    },
    fetchMessagesRejected: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearMessages: (state) => {
      state.allMessages = initialState.allMessages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewChat.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(createNewChat.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createNewChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const {
  fetchMessagesPending,
  fetchMessagesFulfilled,
  fetchMessagesRejected,
  clearMessages,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
