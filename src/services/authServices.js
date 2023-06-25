import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {FirebaseCollections} from '../utils/FirebaseCollections';
export const signInWithEmailAndPassword = async ({email, password}) => {
  const value = await auth().signInWithEmailAndPassword(email, password);
  return {
    uid: value.user.uid,
  };
};

// export const signUpUser = createAsyncThunk('auth/signup', async uMainData => {
//   const response = await createUserWithEmailAndPassword(
//     auth,
//     uMainData.ownerEmail,
//     uMainData.password,
//   );
//   return {
//     id: response.user.uid,
//   };
// });

// export const createUserCollection = createAsyncThunk(
//   'user/collection',
//   async uMainData => {
//     const response = await axios.post(
//       `${_baseURL}user-collection.json`,
//       uMainData,
//     );
//   },
// );
export const signupAndCreateUser = async ({
  name,
  email,
  password,
  phone,
  plate,
}) => {
  const res = await auth().createUserWithEmailAndPassword(email, password);
  const uid = res.user.uid;
  console.log(`uid ${uid}`);
  const body = {
    ownerId: uid,
    garageOwner: false,
    ownerName: name,
    ownerEmail: email,
    password: password,
    rePassword: password,
    ownerPhone: phone,
    plate: plate,
  };
  const response = await axios.post(
    `${FirebaseCollections.baseURL}/${FirebaseCollections.userCollection}`,
    body,
  );
  console.log(`response ${response}`);
  await AsyncStorage.setItem('uid', uid);
};

// 'Test@gm.co',
//     'Test_111',
