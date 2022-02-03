import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export const messaging = getMessaging();
export const publicKey =
  'BD4Yvc9AFYH8YTzfWPebxIswzBJsC0E3fhovMoW3CThTlWB_2QE9_TSgKgPIKeXpY2Aw-uIjzl64H0MqbL19kog';

export const accessRegistrationToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: publicKey });

    console.log('Current token', currentToken);
    return currentToken;
  } catch (error) {
    console.log(error);
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
