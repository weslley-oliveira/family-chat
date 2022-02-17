import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAkRYRbsLnZPuI6I2Mxq-b3L8_aKO5U74Y",
    authDomain: "super-chat-cc1d0.firebaseapp.com",
    projectId: "super-chat-cc1d0",
    storageBucket: "super-chat-cc1d0.appspot.com",
    messagingSenderId: "17057451193",
    appId: "1:17057451193:web:4f22af5c100c21c3e95f68",
};
    
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();