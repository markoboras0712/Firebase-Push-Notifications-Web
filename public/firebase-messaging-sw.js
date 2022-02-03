/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyDjZhdmZn2fVuA3wZoF-73f3NwzkJdgNfM',
  authDomain: 'mboras-cloud-messaging.firebaseapp.com',
  projectId: 'mboras-cloud-messaging',
  storageBucket: 'mboras-cloud-messaging.appspot.com',
  messagingSenderId: '1077810674165',
  appId: '1:1077810674165:web:18670931b5a2db7898c8bc',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
