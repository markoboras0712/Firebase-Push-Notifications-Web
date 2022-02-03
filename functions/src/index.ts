/* eslint-disable @typescript-eslint/no-unused-vars */
import functions = require('firebase-functions');
import admin = require('firebase-admin');
const serviceAccount = require('../mboras-cloud-messaging-firebase-adminsdk-3crg4-d849258dda.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const cors = require('cors')({ origin: 'http://localhost:3000' });
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    response.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    console.log('Request body', request.body);
    const registrationToken = request.body.data.fcmToken;

    // const FCMToken = admin.database().ref(`/FCMTokens/${userId}`).once('value');
    const FCMTokenTest = await admin
      .firestore()
      .collection('users')
      .doc(request.body.data.to)
      .get();
    console.log('fcm test od usera', FCMTokenTest.data().fcmToken);

    const payload = {
      token: FCMTokenTest.data().fcmToken,
      notification: {
        title: request.body.data.displayName,
        body: request.body.data.text,
      },
      data: {
        body: request.body.data.text,
      },
    };
    console.log('testcina s service accountom fcm token', registrationToken);
    console.log('sending payload cloud function', payload);
    try {
      const res = await admin.messaging().send(payload);
      response.status(200).send(res);
      console.log('Responseeee fcm', res);
    } catch (error) {
      console.log('errrocina', error);
    }
  });
});
