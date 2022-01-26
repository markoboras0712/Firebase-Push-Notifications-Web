import { db } from 'modules/redux-store/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'modules/users';
import { AuthData } from 'modules/authentication';

export const fetchUsers = createAsyncThunk('fetchUsers', async (id: string) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('id', '!=', id)),
    );
    const allUsers: User[] = querySnapshot.docs.map((res) => ({
      email: res.data().email,
      uid: res.data().id,
      userName: res.data().displayName,
      userPhoto: res.data().photoUrl,
      activeChats: res.data().activeChats,
    }));
    return allUsers;
  } catch (error) {
    throw new Error('didnt fetch data');
  }
});

export const fetchInboxUsers = createAsyncThunk(
  'fetchInboxUsers',
  async ({ activeChats, id }: AuthData) => {
    try {
      const chatsQuery = query(
        collection(db, 'users'),
        where('activeChats', 'array-contains-any', activeChats),
      );
      const querySnapshot = await getDocs(chatsQuery);
      const inboxUsers: User[] = querySnapshot.docs.map((res) => ({
        email: res.data().email,
        uid: res.data().id,
        userName: res.data().displayName,
        userPhoto: res.data().photoUrl,
        activeChats: res.data().activeChats,
      }));
      return inboxUsers.filter((user) => user.uid !== id);
    } catch (error) {
      throw new Error('didnt fetch data');
    }
  },
);
