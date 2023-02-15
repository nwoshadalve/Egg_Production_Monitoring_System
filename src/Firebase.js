import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBnWCrucXaUsJJkLe6l9Mdd_Z2GIZR0SZ0",
  authDomain: "light-int-sensor.firebaseapp.com",
  databaseURL: "https://light-int-sensor-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "light-int-sensor",
  storageBucket: "light-int-sensor.appspot.com",
  messagingSenderId: "608222303573",
  appId: "1:608222303573:web:4accdc8bbd58ba4d754bdc",
  measurementId: "G-DNESVHHS61"
};

 var fireDB = firebase.initializeApp(firebaseConfig);

 export default fireDB;