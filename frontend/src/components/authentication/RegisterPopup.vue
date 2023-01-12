<template>
  <RegisterButton />

  <input type="checkbox" id="my-modal-register" class="modal-toggle" />
  <div class="modal" id="my-modal-register">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Register</h3>
      <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button class="btn btn-primary" @click="signInWithGoogle">
          <IconGoogle> </IconGoogle>
          Sign in with Google
        </button>
      </div>
      <br />
      <div class="col-span-6 text-white">
        <label
          for="Email"
          class="text-zinc-50 block text-sm font-medium text-gray-400"
        >
          Email
        </label>
        <input
          required
          type="email"
          id="EmailRegister"
          name="email"
          v-model="email"
          class="input-primary mt-1 w-full rounded-md text-sm shadow-sm border-gray-800 bg-gray-800 text-gray-400"
        />
      </div>
      <br />
      <div class="col-span-6 sm:col-span-3">
        <label
          for="Password"
          class="text-zinc-50 block text-sm font-medium text-gray-400"
        >
          Password
        </label>

        <input
          required
          type="password"
          id="PasswordEmail"
          name="password"
          v-model="password"
          class="mt-1 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-200"
        />
      </div>
      <br />
      <div class="col-span-6 sm:col-span-3">
        <label
          for="PasswordConfirmation"
          class="text-zinc-50 block text-sm font-medium text-gray-400"
        >
          Password Confirmation
        </label>

        <input
          required
          type="password"
          id="PasswordConfirmation"
          name="password_confirmation"
          v-model="password2"
          class="mt-1 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-200"
        />
      </div>

      <div class="col-span-6 sm:flex sm:items-center sm:gap-4 mt-5">
        <button @click="register" class="btn btn-primary">
          Create an account
        </button>
        <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
        <p class="text-zinc-50 mt-4 text-sm text-gray-400 sm:mt-0">
          Already have an account?

          <button @click="onOkClick" class="underline text-gray-200">
            <LoginButtonPurple />
          </button>
        </p>
      </div>
      <div class="modal-action">
        <label for="my-modal-register" class="btn">Close</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { ref } from "vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import RegisterButton from "@/components/authentication/RegisterButton.vue";
import LoginButtonPurple from "@/components/authentication/LoginButtonPurple.vue";
import {CryptohubApi} from "@/stores/CryptohubApi";

// register
const email = ref("");
const password = ref("");
const password2 = ref("");
const errMsg = ref();

const auth = getAuth();

const onOkClick = () => {
  const myModal = document.getElementById("my-modal-register");
  myModal?.click();
};

const register = () => {
  if (password.value !== password2.value) {
    errMsg.value = "Passwords is different";
  } else {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((_data) => {
        console.log("Successfully registered !!! ");
        console.log(_data);
        const user = auth.currentUser;
        CryptohubApi.addUser(user!.uid, email.value);

        alert("Successfully registered !!!  uid "  + user?.uid + " email " + email.value);
      })
      .catch((error) => {
        const obj: Record<string, string> = {
          "auth/invalid-email": "Invalid Email",
          "auth/weak-password": "Password should be at least 6 characters",
          "auth/email-already-in-use": "Email already in use",
          "auth/internal-error": "Mettez un mot de passe ",
        };
        const message = obj[error.code];
        if (!message) {
          errMsg.value = error.message;
        } else {
          errMsg.value = message;
        }
      });
  }
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result);
      const user = auth.currentUser;
        CryptohubApi.addUser(user!.uid, user!.email);
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case "auth/user-disabled":
          errMsg.value = "User Disabled";
          break;
      }
    });
};
//microsoft
const signInWithMicrosoft = () => {
  const provider = new OAuthProvider("microsoft.com");
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const idToken = credential?.idToken;
      console.log(result);
      //alert("Successfully signed in !!! ");
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case "auth/user-disabled":
          errMsg.value = "User Disabled";
          break;
      }
    });
};
</script>

<style scoped></style>
