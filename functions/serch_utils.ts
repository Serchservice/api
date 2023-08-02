import { messaging } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAWvuetQhoOomRbK6aeEFI3A4dL1twX5X8",
    authDomain: "serchservice-ff849.firebaseapp.com",
    databaseURL: "https://serchservice-ff849-default-rtdb.firebaseio.com",
    projectId: "serchservice-ff849",
    storageBucket: "serchservice-ff849.appspot.com",
    messagingSenderId: "538965733495",
    appId: "1:538965733495:web:cd17b3a730af712c84d672",
    measurementId: "G-6PXVHM8VDX"
};

const firebaseApp = initializeApp(firebaseConfig);

export class SerchUtils {
    static firebaseApp = () => firebaseApp;
    static firebaseMessaging = () => getMessaging(firebaseApp);
};