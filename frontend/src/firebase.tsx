import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-dQ6F1CfuIm5sTpQ3aDOZqJf15P_5nPY",
    authDomain: "notes-app-9b345.firebaseapp.com",
    projectId: "notes-app-9b345",
    storageBucket: "notes-app-9b345.appspot.com",
    messagingSenderId: "238646174518",
    appId: "1:238646174518:web:c66f6207892151adddc997",
    measurementId: "G-W7SG9ERTYK"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app }