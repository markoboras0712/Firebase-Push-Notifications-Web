/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  enableIndexedDbPersistence,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDjZhdmZn2fVuA3wZoF-73f3NwzkJdgNfM',
  authDomain: 'mboras-cloud-messaging.firebaseapp.com',
  projectId: 'mboras-cloud-messaging',
  storageBucket: 'mboras-cloud-messaging.appspot.com',
  messagingSenderId: '1077810674165',
  appId: '1:1077810674165:web:18670931b5a2db7898c8bc',
});

export const functions = getFunctions(firebaseApp);

export const db = getFirestore();
export const storage = getStorage(firebaseApp);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

if (location.hostname === 'localhost') {
  console.log(
    'testing locally -- hitting local functions and firestore emulators',
  );
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.log('error code', err);
  } else if (err.code == 'unimplemented') {
    console.log('error code', err);
  }
});
