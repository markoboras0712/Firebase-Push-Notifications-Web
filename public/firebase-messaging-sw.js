/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDjZhdmZn2fVuA3wZoF-73f3NwzkJdgNfM',
  authDomain: 'mboras-cloud-messaging.firebaseapp.com',
  projectId: 'mboras-cloud-messaging',
  storageBucket: 'mboras-cloud-messaging.appspot.com',
  messagingSenderId: '1077810674165',
  appId: '1:1077810674165:web:18670931b5a2db7898c8bc',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const savedMessageId = '';
messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  if (savedMessageId === payload.data.body) {
    savedMessageId = payload.data.body;
  } else {
    return;
  }
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: savedMessageId,
    icon: '/logo192.png',
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
