import { messaging } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAWvuetQhoOomRbK6aeEFI3A4dL1twX5X8",
    authDomain: "serchservice-ff849.firebaseapp.com",
    projectId: "serchservice-ff849",
    storageBucket: "serchservice-ff849.appspot.com",
    messagingSenderId: "538965733495",
    appId: "1:538965733495:web:10d752628c3e808f84d672",
    measurementId: "G-8E8JG503NR"
};

const firebaseApp = initializeApp(firebaseConfig);

export class SerchUtils {
    static firebaseApp = () => firebaseApp;
    static firebaseMessaging = () => getMessaging(firebaseApp);
};