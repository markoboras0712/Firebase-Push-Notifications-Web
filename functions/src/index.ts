/* eslint-disable @typescript-eslint/no-unused-vars */
import functions = require('firebase-functions');
import admin = require('firebase-admin');
const serviceAccount = require('../mboras-cloud-messaging-firebase-adminsdk-3crg4-dce7b139ed.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const cors = require('cors')({ origin: 'http://localhost:3000' });

exports.sendMessage = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    response.header('Access-Control-Allow-Origin', '*');
    console.log('Request body', request.body);

    const payload = {
      token: request.body.data.otherUserFcmToken,
      notification: {
        title: request.body.data.displayName,
        body: request.body.data.text,
      },
      data: {
        body: request.body.data.text,
      },
    };
    console.log('sending payload cloud function', payload);
    try {
      // const subCollectionRef = await admin
      //   .firestore()
      //   .collection('messages')
      //   .doc(request.body.data.subCollection)
      //   .collection('messages')
      //   .add({
      //     createdAt: new Date(Date.now()),
      //     text: request.body.data.text,
      //     uid: request.body.data.uid,
      //     to: request.body.data.to,
      //   });

      const res = await admin.messaging().send(payload);
      response.send({
        status: 200,
        data: res,
      });
      console.log('Responseeee fcm', res);
    } catch (error) {
      console.log('errrocina', error);
    }
  });
});

// exports.createNewChatTest = functions.https.onRequest((request, response) => {
//   cors(request, response, async () => {
//     response.header('Access-Control-Allow-Origin', '*');
//     console.log('Request body', request.body);
//     try {
//       const chatRef = await admin.firestore().collection('messages').add({});

//       const userChatRef = admin
//         .firestore()
//         .collection('users')
//         .doc(request.body.data.uid);
//       await userChatRef.update({
//         activeChats: admin.firestore.FieldValue.arrayUnion(chatRef.id),
//       });

//       const receiverChatRef = admin
//         .firestore()
//         .collection('users')
//         .doc(request.body.data.to);
//       await receiverChatRef.update({
//         activeChats: admin.firestore.FieldValue.arrayUnion(chatRef.id),
//       });
//       const userData = await userChatRef.get();
//       console.log('user data cloud backend', userData.data());
//       response.send({ data: userData.data() });
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });

// exports.getMessagesTest = functions.https.onRequest((request, response) => {
//   cors(request, response, async () => {
//     response.header('Access-Control-Allow-Origin', '*');
//     console.log('Request body', request.body);
//     try {
//       const unsub = admin
//         .firestore()
//         .collection('messages')
//         .doc(request.body.data)
//         .collection('messages')
//         .onSnapshot((snapshot) => {
//           console.log(
//             'onSnapshot cloud functions',
//             snapshot.docs.map((doc) => doc.data()),
//           );
//         });
//       unsub();

//       const messagesRef = await admin
//         .firestore()
//         .collection('messages')
//         .doc(request.body.data)
//         .collection('messages')
//         .get();
//       console.log(
//         'data cloud functions of messages',
//         messagesRef.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//           createdAt: doc.data().createdAt.toDate(),
//         })),
//       );

//       response.send({
//         data: messagesRef.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//           createdAt: doc.data().createdAt.toDate(),
//         })),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });
