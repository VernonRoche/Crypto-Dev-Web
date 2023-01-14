<template>
  <div>

  <!-- <LoginButton /> -->

  <label for="my-modal-login" class="btn btn-default ">Login</label>

  <input type="checkbox" id="my-modal-login" class="modal-toggle" />
  <div class="modal" id="my-modal-login">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Connection</h3>
      <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button class="btn btn-primary gap-2" @click="signInWithGoogle">
          <IconGoogle> </IconGoogle>
          Sign in with Google
        </button>
      </div>
      <br />
      <div class="col-span-6">
        <label for="Email" class="block text-sm font-medium text-gray-400">
          Email
        </label>
        <p>
          <input
            required
            type="email"
            id="Email"
            name="email"
            v-model="email"
            class="mt-1 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-400"
          />
        </p>
      </div>

      <div class="col-span-6 sm:col-span-3">
        <label for="Password" class="block text-sm font-medium text-gray-400">
          Password
        </label>
        <p>
          <input
            required
            type="password"
            id="Password"
            name="password"
            v-model="password"
            class="mt-1 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-400"
          />
        </p>
      </div>

      <p class="text-red-500" v-if="errMsg">{{ errMsg  }}</p>

      <div class="col-span-6 sm:col-span-3" v-if="cpt >= 3">
        <button class="text-zinc-50 btn btn-link" @click="resetPassWord">
          Reinitialiser Mot De Passe
        </button>
        <div v-if="isResetPassWord"></div>
        <br />
      </div>
      <br />

      <div class="col-span-6 sm:flex sm:items-center sm:gap-4 mt-5">
        <button @click="sign" class="btn btn-primary">Sign in</button>
        <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
        <p class="text-zinc-50 mt-4 text-sm text-gray-400 sm:mt-0">
          Don't have an account?

          <button @click="onOkClick" class="underline text-gray-200">
            <RegisterButton />
          </button>
        </p>
      </div>
      <br />

      <div class="modal-action">
        <label for="my-modal-login" class="btn">Close</label>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import LoginButton from "@/components/authentication/LoginButton.vue";
import RegisterButton from "@/components/authentication/RegisterButton.vue";
import { Login } from "@/stores/login";


const email = ref("");
const password = ref("");
const errMsg = ref();

const user = getAuth().currentUser;

let cpt = 0;

/**
 * Display modal for login
 */
const onOkClick = () => {
  const myModal = document.getElementById("my-modal-login");
  myModal?.click();
};

/**
 * Sign in a user with email and password using firebase auth ,  we have a counter to possible errors 
 */
const sign = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((_data) => {
      Login.changeStateLogin();
      cpt = 0;
    })
    .catch((error) => {
      const obj: Record<string, string> = {
        "auth/invalid-email": "Invalid Email",
        "auth/user-not-found": "User Not Found",
        "auth/wrong-password": "Wrong Password",
        "auth/user-disabled": "User Disabled",
      };
      const message = obj[error.code];
      if (!message) {
        errMsg.value = error.message;
        cpt++;
      } else {
        errMsg.value = message;
      }
      if (message == "Wrong Password") {
        cpt++;
      }
      console.log(error.code);
    });
};

//reset Pasword

const isResetPassWord = ref(false);

/**
 * confirm is user clicking on reset password button
 */
const isReset = () => {
  isResetPassWord.value = true;
};

/**
 * reset password using firebase auth 
 * when user have 3 errors in login form 
 * a reset password button is displayed
 */
const resetPassWord = () => {
  const auth = getAuth();
  const emailAddress = email.value;
  sendPasswordResetEmail(auth, emailAddress)
    .then(() => {
      alert("Email sent");
      isReset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
};


/**
 * Sign in a user with google using firebase auth
 */
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
     

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

/**
 * Sign in a user with microsoft using firebase auth
 */
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

/**
 * Sign in a user with phone using firebase auth
 * user receive a code by sms and password is not required
 * we use recaptcha verifier to verify user is not a robot
 */
const isSignInWithPhone = ref(false);
const signInWithPhone = () => {
  isSignInWithPhone.value = true;
  const div = document.querySelector("#myDiv");
  div?.classList.toggle("hidden");
};

const isCode = ref(false);

const signInWithPhoneCode = () => {
  isCode.value = true;
};
const auth = getAuth();
const phoneNumber = ref("");
const code = ref("");

/**
 * init recaptcha verifier
 */
const initRecaptchatVerifier = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      // 'size': 'normal',
      // 'callback': (_response: any) => {
      // }
    },
    auth
  );
};

/**
 * Create 
 */
const signInWithPhoneCodeSend = () => {
  initRecaptchatVerifier();
  signInWithPhoneCode();
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber.value, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("We sent SMS !!! ");
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
      console.log(error);
    });
};

const confirmCode = () => {
  const confirmationResult = window.confirmationResult;
  confirmationResult
    .confirm(code.value)
    .then((result: { user: any }) => {
      // User signed in successfully.
      const user = result.user;
      //useridentity();
      alert("User signed in successfully !!! ");
    })
    .catch((error: any) => {
      console.log(error);
    });
};
</script>

<style scoped></style>
