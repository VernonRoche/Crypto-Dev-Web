<template>
  <a href="#my-modal-2" class="btn btn-default">Login</a>

  <div class="modal" id="my-modal-2">
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
        <label for="Email" class="block text-sm font-medium text-gray-200">
          Email
        </label>
        <p>
          <input
            required
            type="email"
            id="Email"
            name="email"
            v-model="email"
            class="mt-1 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-200"
          />
        </p>
      </div>

      <div class="col-span-6 sm:col-span-3">
        <label for="Password" class="block text-sm font-medium text-gray-200">
          Password
        </label>
        <p>
          <input
            required
            type="password"
            id="Password"
            name="password"
            v-model="password"
            class="mt-1 w-full rounded-md text-sm shadow-sm border-gray-700 bg-gray-800 text-gray-200"
          />
        </p>
      </div>

      <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>

      <div class="modal-action">
        <a href="#" class="btn">close</a>
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

const email = ref("");
const email2 = ref("");
const password = ref("");
const errMsg = ref();

const user = getAuth().currentUser;

let cpt = 0;

const sign = () => {
  console.log("cpt " + cpt);
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((_data) => {
      console.log("Successfully signed in !!! ");
      //alert("Successfully signed in !!!");
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

const isReset = () => {
  isResetPassWord.value = true;
};

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

// sign with link to email
const linksent = ref(false);
const signOnlyLinkEmail = () => {
  linksent.value = true;
  const div = document.querySelector("#myDiv2");
  div?.classList.toggle("hidden");
};

const signInWithLinkEmail = () => {
  const auth = getAuth();
  const actionCodeSettings = {
    url: "http://localhost:5173/about",
    handleCodeInApp: true,
  };
  sendSignInLinkToEmail(auth, email2.value, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignIn", email.value);
      alert("Email sent");
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
        errMsg.value = "Email or password was incorrect";
      } else {
        errMsg.value = message;
      }
      console.log(error.code);
    });
};

//google
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
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

// sign with phone number

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
