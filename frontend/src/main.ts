import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "@/assets/style.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web mainApp's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrazPzNJwg2Gx8JHO6X4p8aQ8hkcIbGgY",
  authDomain: "cryptohub-d292e.firebaseapp.com",
  projectId: "cryptohub-d292e",
  storageBucket: "cryptohub-d292e.appspot.com",
  messagingSenderId: "917943863687",
  appId: "1:917943863687:web:63d536561f8e592a80ab22",
  measurementId: "G-CVDWBN1KRB",
};

// Initialize Firebase
initializeApp(firebaseConfig);
//const analytics = getAnalytics(App);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#mainApp");
