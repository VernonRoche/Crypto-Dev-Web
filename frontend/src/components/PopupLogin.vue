<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <h1>Create or Sign in an account</h1>
      <!-- <p> <input type="text" placeholder="Name" v-model="name"</p> -->
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="text" placeholder="Password" v-model="password" /></p>
      <p><button @click="sign">Sign</button></p>
      <p><button @click="register">Register</button></p>
      <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
      <div v-if="cpt >= 3">
        <buton @click="resetPassWord">Reinitialiser Mot De Passe</buton>
        <div v-if="isResetPassWord">
          <p><input type="text" placeholder="Email" v-model="email" /></p>
        </div>
      </div>
      <p>
        <button @click="signInWithPhone">
          Sign with <img src="../assets/phone.jpeg" width="50" height="50" />
        </button>
      </p>
      <div v-if="isSignInWithPhone">
        <p>
          <input
            type="text"
            placeholder="Phone Number with indicator "
            v-model="phoneNumber"
          />
        </p>
        <div id="recaptcha-container"></div>
        <p><button @click="signInWithPhoneCodeSend">Send Code</button></p>
        <div v-if="isCode">
          <p><input type="text" placeholder="Enter Code" v-model="code" /></p>
          <p><button @click="confirmCode">Confirm Code</button></p>
        </div>
      </div>
      <br />

      <p>
        <button @click="signInWithGoogle">
          Sign with
          <img src="../assets/Google_ G _Logo.svg.png" width="50" height="50" />
        </button>
      </p>
      <br />
      <p>
        <button @click="signInWithMicrosoft">
          Sign with
          <img src="../assets/Microsoft_logo.svg.png" width="50" height="50" />
        </button>
      </p>
      <br />
      <p>
        <button @click="signOnlyLinkEmail">
          Sign with
          <img src="../assets/Mail_(Apple)_logo.png" width="50" height="50" />
        </button>
      </p>
      <div v-if="linksent">
        <p><input type="text" placeholder="Email" v-model="email2" /></p>
        <p>
          <button @click="signInWithLinkEmail">Sign with link email</button>
        </p>
      </div>

      <button class="popup-close" @click="handlePopupLogin">close popup</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendSignInLinkToEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { popupTrigger, handlePopupLogin } from "../types/popup";

const email = ref("");
const email2 = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref();

const user = getAuth().currentUser;

let cpt = 0;
// sign

const useridentity = () => {
  if (user !== null) {
    const displayName = user.displayName;
    const emailUser = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
};
const sign = () => {
  console.log("cpt " + cpt);
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((_data) => {
      console.log("Successfully signed in !!! ");
      //router.push("/about");
      alert("Successfully signed in !!!");
      cpt = 0;
      //useridentity();
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

// register

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((_data) => {
      //useridentity();
      console.log("Successfully registered !!! ");
      alert("Successfully registered !!! ");
      //router.push("/about");
    })
    .catch((error) => {
      //console.log(error.code);
      //alert(error.message);
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
      // Password reset email sent!
      // ..
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
      //useridentity();
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
      //router.push("/about");
      //useridentity();
      alert("Successfully signed in !!! ");
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
      // Get the OAuth access token and ID Token
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const idToken = credential?.idToken;
      //useridentity();
      console.log(result);
      //router.push("/about");
      alert("Successfully signed in !!! ");
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
      //router.push("/about");

      // ...
    })
    .catch((error: any) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error);
    });
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
  .popup-inner {
    background: #fff;
    padding: 32px;
  }
}
</style>
