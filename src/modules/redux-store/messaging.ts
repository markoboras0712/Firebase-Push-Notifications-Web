import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseApp } from 'modules/redux-store';

export const messaging = getMessaging(firebaseApp);
export const publicKey =
  'BCpN-4127SqyicRhbVIK1jJSbYfia18RBwICxbDN7MwuEL0SWKxcBoOfLf1N411fG0pgNRHfv5kAZcXf-ggq4OQ';

export const accessRegistrationToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: publicKey });
    return currentToken;
  } catch (error) {
    console.log(error);
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

/*const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.image,
  };

  if (!('Notification' in window)) {
    console.log('This browser does not support system notifications.');
  } else if (Notification.permission === 'granted') {
    console.log('notificataion granted');

    const notification = new Notification(
      notificationTitle as string,
      notificationOptions,
    );
    notification.onclick = function (event) {
      event.preventDefault();
      window.open(payload.notification?.body, '_blank');
      notification.close();
    };
  } */
