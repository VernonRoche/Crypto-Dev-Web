import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import PopupLogin from "@/components/authentication/LoginPopup.vue";
import { expect, test } from "vitest";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { assert } from "chai";

const firebaseConfig = {
  apiKey: "AIzaSyCrazPzNJwg2Gx8JHO6X4p8aQ8hkcIbGgY",
  authDomain: "cryptohub-d292e.firebaseapp.com",
  projectId: "cryptohub-d292e",
  storageBucket: "cryptohub-d292e.appspot.com",
  messagingSenderId: "917943863687",
  appId: "1:917943863687:web:63d536561f8e592a80ab22",
  measurementId: "G-CVDWBN1KRB",
};

firebase.initializeApp(firebaseConfig);

const auth = getAuth();

// describe('Authentication', () => {
// it('should login a user with email and password', async () => {
test("Sign with password", async () => {
  const email = "test@cryptohub.fr";
  const password = "0123456";

  await signInWithEmailAndPassword(auth, email, password);

  const user = auth.currentUser;
  expect(user).toBeTruthy();
  expect(user?.email).toEqual(email);
});
// })
test("create An Account", async () => {
  const email = "test2@cryptohub.fr";
  const password = "0123456789";
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);

  const user = auth.currentUser;
  expect(user).toBeTruthy();

  expect(user?.email).toEqual(email);
});

test("Is reset password", async () => {
  const email = "test3@cryptohub.fr";
  const password = "0123456";
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);

  await sendPasswordResetEmail(auth, email);
  const user = auth.currentUser;
  expect(user).toBeTruthy();
  expect(user?.email).toEqual(email);
});

test("sign in with link email", async () => {
  const email = "samsonvin@orange.fr";
  const password = "0123456";
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);

  const actionCodeSettings = {
    url: "http://localhost:5173/about",
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  const user = auth.currentUser;
  expect(user).toBeTruthy();
  expect(user?.email).toEqual(email);
});

//  test("connect with google",async () => {
//   const provider = new GoogleAuthProvider();
//   const auth = getAuth();
//   const result = await signInWithPopup(auth, provider);
//   assert.isTrue(result.user !== null);

//  })

test("delete user", async () => {
  await signInWithEmailAndPassword(auth, "samsonvin@orange.fr", "0123456");

  const user = auth.currentUser;

  if (user) {
    const result = await user.delete();
  }
});

test("delete user3", async () => {
  await signInWithEmailAndPassword(auth, "test3@cryptohub.fr", "0123456");

  const user = auth.currentUser;

  if (user) {
    const result = await user.delete();
  }
});

test("delete user2", async () => {
  await signInWithEmailAndPassword(auth, "test2@cryptohub.fr", "0123456789");

  const user = auth.currentUser;

  if (user) {
    const result = await user.delete();
  }
});
