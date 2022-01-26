import { fetchUsers } from 'modules/users/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllUsers, User } from 'modules/users';
import { fetchInboxUsers } from 'modules/users/redux/usersActions';

const initialState: AllUsers = {
  allUsers: [],
  inboxUsers: [],
  keyword: '',
  user: {
    uid: '',
    userName: '',
    userPhoto: '',
    activeChats: [],
    email: '',
  },
  isLoading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setUser(state, action: PayloadAction<string>) {
      state.user = state.allUsers.find(
        (user) => user.uid === action.payload,
      ) as User;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      },
    );
    builder.addCase(
      fetchInboxUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.inboxUsers = action.payload;
      },
    );
  },
});

export const usersReducer = usersSlice.reducer;

export const { addKeyword, setUser } = usersSlice.actions;
