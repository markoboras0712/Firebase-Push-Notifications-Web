/* eslint-disable @typescript-eslint/no-unused-vars */
import functions = require('firebase-functions');
import admin = require('firebase-admin');
const serviceAccount = require('../mboras-cloud-messaging-firebase-adminsdk-3crg4-dce7b139ed.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const cors = require('cors')({ origin: 'http://localhost:3000' });
//
exports.helloWorld = functions.https.onRequest((request, response) => {
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

exports.createNewChatTest = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    response.header('Access-Control-Allow-Origin', '*');
    console.log('Request body', request.body);
    try {
      const chatRef = await admin.firestore().collection('messages').add({});
      const db = admin.firestore();
      console.log('chat ref cloud functions', chatRef.id);
      await admin
        .firestore()
        .collection('messages')
        .doc(chatRef.id)
        .collection('messages')
        .add({});
      const userChatRef = admin
        .firestore()
        .collection('users')
        .doc(request.body.data.uid);
      console.log('userChatRef', userChatRef);

      userChatRef.update({
        activeChats: firebase.firestore.FieldValue.arrayUnion(chatRef.id),
      });
      const receiverChatRef = admin
        .firestore()
        .collection('users')
        .doc(request.body.data.to);
      receiverChatRef.update({
        activeChats: firebase.firestore.FieldValue.arrayUnion(chatRef.id),
      });
    } catch (error) {
      console.log(error);
    }
  });
});

/*export const createNewChat = createAsyncThunk(
  'createNewChat',
  async (message: Message, { dispatch }) => {
    try {
      const chatRef = await addDoc(collection(db, 'messages'), {});
      await addDoc(collection(db, 'messages', chatRef.id, 'messages'), {});
      await updateDoc(doc(db, 'users', message.uid), {
        activeChats: arrayUnion(chatRef.id),
      });
      await updateDoc(doc(db, 'users', message.to), {
        activeChats: arrayUnion(chatRef.id),
      });
      dispatch(updateUserChats(message.uid));
    } catch (error) {
      throw new Error('didnt send message');
    }
  },
);*/
