import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyA5m_kkzoaf5SpN-f38noxdA_iHtOGEn-o",
    authDomain: "dev-profile-97641.firebaseapp.com",
    databaseURL: "https://dev-profile-97641.firebaseio.com",
    projectId: "dev-profile-97641",
    storageBucket: "dev-profile-97641.appspot.com",
    messagingSenderId: "275429612570",
    appId: "1:275429612570:web:7c2ec653cc2e03ef7005a3",
    measurementId: "G-V4ELQX7465"
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default fireDB.database().ref()
