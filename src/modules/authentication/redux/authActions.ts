/* eslint-disable @typescript-eslint/no-unused-vars */
import { navigate } from '@reach/router';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Routes } from 'fixtures';
import { Register, Login, AuthData } from 'modules/authentication';
import { auth, db, provider, storage } from 'modules/redux-store';
import { fetchInboxUsers, fetchUsers } from 'modules/users';

export const getUser = createAsyncThunk(
  'getUser',
  async (user: User, { dispatch }) => {
    try {
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      dispatch(fetchUsers(user.uid));
      if (docSnap.exists()) {
        const userFromFirestore = docSnap.data();
        if (!!userFromFirestore.activeChats)
          dispatch(fetchInboxUsers(userFromFirestore as AuthData));
        navigate(Routes.Contacts);
        return userFromFirestore;
      }
      const authUser: AuthData = {
        email: user.email,
        id: user.uid,
        photoUrl: user.photoURL,
        activeChats: [],
        displayName: user.displayName,
      };
      return authUser;
    } catch (error) {
      alert(error);
      throw new Error('didnt get user data');
    }
  },
);

export const updateUserChats = createAsyncThunk(
  'updateUserChats',
  async (uid: string, { dispatch }) => {
    try {
      dispatch(fetchUsers(uid));
      const docSnap = await getDoc(doc(db, 'users', uid));
      if (docSnap.exists()) {
        const userFromFirestore = docSnap.data();
        return userFromFirestore.activeChats;
      }
    } catch (error) {
      alert(error);
      throw new Error('didnt get user data');
    }
  },
);

export const addUserToFirestore = createAsyncThunk(
  'addUserToFirestore',
  async (user: AuthData) => {
    try {
      await setDoc(doc(db, 'users', user.id), user);
    } catch (err) {
      alert(err);
      throw new Error('Didnt add user to firestore');
    }
  },
);

export const signInWithGoogle = createAsyncThunk(
  'signInWithGoogle',
  async (_, { dispatch }) => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const q = query(collection(db, 'users'), where('id', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const authUser: AuthData = {
        email: user.email,
        id: user.uid,
        photoUrl: user.photoURL,
        activeChats: [],
        displayName: user.displayName,
      };
      if (!querySnapshot.docs.length) {
        dispatch(addUserToFirestore(authUser));
      }
    } catch (err) {
      alert(err);
      throw new Error('Didnt sign in');
    }
  },
);

export const signUpWithEmailPassword = createAsyncThunk(
  'signUpWithEmailPassword',
  async (
    { email, password, firstName, lastName, photoUrl }: Register,
    { dispatch },
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      dispatch(
        addUserToFirestore({
          displayName: `${firstName} ${lastName}`,
          email,
          id: response.user.uid,
          activeChats: [],
          photoUrl: photoUrl as string,
        }),
      );
    } catch (error) {
      alert(error);
      throw new Error('Didng signup');
    }
  },
);

export const signInWithEmailPassword = createAsyncThunk(
  'signInWithEmailPassword',
  async ({ email, password }: Login) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error);
      throw new Error('Didnt sign in');
    }
  },
);

export const logout = createAsyncThunk('logout', async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error('didnt logout');
  }
});

export const sendPasswordReset = createAsyncThunk(
  'sendPasswordReset',
  async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      alert(error);
      throw new Error('didnt send password reset');
    }
  },
);

export const getFirestoreImageUrl = async (photoName: string, photo: File) => {
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, photoName);
  await uploadBytes(imagesRef, photo);
  const url = await getDownloadURL(imagesRef);
  return url;
};
