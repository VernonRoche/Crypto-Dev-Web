<template>
  <!-- Button to open modal -->
  <RegisterButton />


  <input type="checkbox" id="my-modal-register" class="modal-toggle" />
  <div class="modal" id="my-modal-register">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Register</h3>
      <!-- Register with Google -->
      <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button class="btn btn-primary" @click="signInWithGoogle">
          <IconGoogle />
          Sign in with Google
        </button>
      </div>
      <br />
      <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
        <label for="Name" class="text-zinc-50 block text-sm font-medium text-gray-400">
          Name
        </label>
        <input required type="name" id="NameRegister" name="Name" v-model="name"
          class="input-primary mt-1 w-full rounded-md text-sm shadow-sm border-gray-800 bg-gray-800 text-gray-400" />
      </div>
      <br />
      <!-- Register form -->
      <div class="col-span-6 text-white">
        <label for="Email" class="text-zinc-50 block text-sm font-medium text-gray-400">
          Email
        </label>
        <input required type="email" id="EmailRegister" name="email" v-model="email"
          class="input-primary mt-1 w-full rounded-md text-sm shadow-sm border-gray-800 bg-gray-800 text-gray-400" />
      </div>
      <br />
      <div class="col-span-6 sm:col-span-3">
        <label for="Password" class="text-zinc-50 block text-sm font-medium text-gray-400">
          Password
        </label>

        <input required type="password" id="PasswordEmail" name="password" v-model="password"
          class="mt-1 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-200" />
      </div>
      <br />
      <div class="col-span-6 sm:col-span-3">
        <label for="PasswordConfirmation" class="text-zinc-50 block text-sm font-medium text-gray-400">
          Password Confirmation
        </label>

        <input required type="password" id="PasswordConfirmation" name="password_confirmation" v-model="password2"
          class="mt-1 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-200" />
      </div>
      <!-- Button to create the account as well as button to switch to the login modal -->
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
      <!-- Button to close modal -->
      <div class="modal-action">
        <label for="my-modal-register" class="btn">Close</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, updateProfile, UserCredential } from "firebase/auth";
import { ref } from "vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import RegisterButton from "@/components/authentication/RegisterButton.vue";
import LoginButtonPurple from "@/components/authentication/LoginButtonPurple.vue";
import { CryptohubApi } from "@/stores/CryptohubApi";
import CryptoList from "../cryptoList/CryptoList.vue";
import { Login } from "@/stores/login";
import {countsignGoogle, incrementgoogle, isconnectedwithgoogle} from "@/stores/counter";

interface RegisterData {
  email: string;
  password: string;
  password2: string;
  errMsg: string;
  name: string | null;
}

const registerData: RegisterData = {
  email: "",
  password: "",
  password2: "",
  errMsg: "",
  name: null
};

const email = ref(registerData.email);
const password = ref(registerData.password);
const password2 = ref(registerData.password2);
const errMsg = ref(registerData.errMsg);
let name = ref(registerData.name);

const auth = getAuth();

/**
 * display modal
 */
const onOkClick = (): void => {
  const myModal = document.getElementById("my-modal-register");
  myModal?.click();
};

/**
 * register a new user with name, email and password with Firebase authentication and add a new user to the database
 */
const register = (): void => {
  if (password.value !== password2.value) {
    errMsg.value = "Passwords is different";
  } else {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((_data) => {
        console.log("Successfully registered !!! ");
        console.log(_data);
        const user = auth.currentUser;
        CryptohubApi.addUser(user!.uid, email.value, [{name:"Bitcoin",  coin_id:"bitcoin"   }, {name:"Ethereum",  coin_id:"ethereum"   }, {name:"Litecoin",  coin_id:"litecoin" } ], [""]);
        updateProfile(user!, {
          displayName: name.value,
        });

        console.log("name : " + name);

        Login.changeStateLogin();
        alert("Successfully registered !!!");

      })
      .catch((error: any) => {
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

/**
 * sign in with google account
 */
const signInWithGoogle = (): void => {
  isconnectedwithgoogle.value = true;
  if (countsignGoogle.value == 0) {
    incrementgoogle();
    const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result: UserCredential) => {
      console.log(result);
      const user = auth.currentUser;
      CryptohubApi.addUser(user!.uid, user!.email, ["Bitcoin", "Ethereum", "Litecoin"], [""]);
      Login.changeStateLogin();
    })
    .catch((error: any) => {
      const obj: Record<string, string> = {
        "auth/user-disabled": "User Disabled",
        "auth/popup-closed-by-user": "Popup Closed By User",
      };
      const message = obj[error.code];
      if (!message) {
        errMsg.value = error.message;
      } else {
        errMsg.value = message;
      }
    });
  } else {
    errMsg.value = "You are already connected with Google ";
  }

};

/**
 * Sign in with Microsoft
 */
const signInWithMicrosoft = (): void => {
  const provider = new OAuthProvider("microsoft.com");
  signInWithPopup(getAuth(), provider)
    .then((result: UserCredential) => {
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const idToken = credential?.idToken;
      console.log(result);
    })
    .catch((error: any) => {
      const obj: Record<string, string> = {
        "auth/user-disabled": "User Disabled",
      };
      const message = obj[error.code];
      if (!message) {
        errMsg.value = error.message;
      } else {
        errMsg.value = message;
      }
    });
};
</script>
