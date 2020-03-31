import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAXelyUVcLOwUmFWEEmy4xcxWdwZitJeRA",
    authDomain: "react-360ff.firebaseapp.com",
    databaseURL: "https://react-360ff.firebaseio.com",
    projectId: "react-360ff",
    storageBucket: "react-360ff.appspot.com",
    messagingSenderId: "150505699243",
    appId: "1:150505699243:web:4fc450815a4444840d44ee",
    measurementId: "G-PWCYY4DYSJ"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;