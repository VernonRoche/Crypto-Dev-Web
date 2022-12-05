<template>
  <h1>Create or Sign in an account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="text" placeholder="Password" v-model="password" /></p>
  <p><button @click="sign">Sign</button></p>
  <p><button @click="register">Register</button></p>
  <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
  <div v-if="(cpt >= 3)">
  <buton @click="resetPassWord">Reinitialiser Mot De Passe</buton>
  <div v-if="isResetPassWord">
    <p><input type="text" placeholder="Email" v-model="email" /></p>
  </div>
</div>
  <center><p><button @click="signInWithPhone">Sign with <img src="../assets/phone.jpeg" width="50" height="50"></button></p>
  <div v-if="isSignInWithPhone">
    <p><input type="text" placeholder="Phone Number" v-model="phoneNumber" /></p>
    <div id="recaptcha-container">recap</div>
    <p><button @click="signInWithPhoneCodeSend">Send Code</button></p>
    <div v-if="isCode">
      <p><input type="text" placeholder="Enter Code" v-model="code" /></p>
      <p><button @click="confirmCode">Confirm Code</button></p>
    </div>
  </div>
  <br />

  <p><button @click="signInWithGoogle">Sign with <img src="../assets/Google_ G _Logo.svg.png" width="50"
        height="50"></button></p>
        <br>
  <p><button @click="signInWithMicrosoft">Sign with <img src="../assets/Microsoft_logo.svg.png" width="50"
        height="50"></button></p>
        <br>
  <p><button @click="signOnlyLinkEmail">Sign with  <img src="../assets/Mail_(Apple)_logo.png" width="50" height="50" ></button></p>
  <div v-if="linksent" >
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><button @click="signInWithLinkEmail">Sign with link email</button></p>
  </div>
  </center>



</template>


<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider, signInWithPhoneNumber  ,RecaptchaVerifier , sendSignInLinkToEmail , sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref();
let cpt = 0;
// sign 
const sign = () => {
  console.log("cpt " + cpt);
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully signed in !!! ");
      router.push("/about");
      alert("Successfully signed in !!!");
      cpt = 0;
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid Email";
          break;
        case "auth/user-not-found":
          errMsg.value = "User Not Found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Wrong Password";
           cpt++;
          break;
        case "auth/user-disabled":
          errMsg.value = "User Disabled";
          break;
        default:
          errMsg.value = 'Email or password was incorrect';
          cpt++;
          break;
      }
    })
};

// register

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered !!! ");
      alert("Successfully registered !!! ");
      router.push("/about");
    })
    .catch((error) => {
      console.log(error.code);
      //alert(error.message);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid Email";
          break;
        case "auth/weak-password":
          errMsg.value = "Password should be at least 6 characters";
          break;
        case "auth/email-already-in-use":
          errMsg.value = "Email already in use";
          break;
        case "auth/internal-error":
          errMsg.value = "Mettez un mot de passe ";
          break;
      }
    })
};

//reset Pasword

const resetPassWord = () => {
  const auth = getAuth();
  const emailAddress = email.value;
  sendPasswordResetEmail(auth,emailAddress)
    .then(() => {
      // Password reset email sent!
      // ..
      alert("Email sent");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
}

// sign with link to email
const linksent = ref(false);
const signOnlyLinkEmail = () => {
  linksent.value = true;
}

const signInWithLinkEmail = () => {
  const auth = getAuth();
  const actionCodeSettings = {
    url: 'http://localhost:5173/about',
    handleCodeInApp: true,
  };
  sendSignInLinkToEmail(auth,email.value, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email.value);
      alert("Email sent");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid Email";
          break;
        case "auth/user-not-found":
          errMsg.value = "User Not Found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Wrong Password";
          break;
        case "auth/user-disabled":
          errMsg.value = "User Disabled";
          break;
        default:
          errMsg.value = 'Email or password was incorrect';
          break;
      }
    })
};

//google
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider).then((result) => {
    console.log(result);
    router.push("/about");
    alert("Successfully signed in !!! ");
  }).catch((error) => {
    console.log(error);
    switch (error.code) {
      case "auth/user-disabled":
        errMsg.value = "User Disabled";
        break;
    }
  })
};

//microsoft
const signInWithMicrosoft = () => {
  const provider = new OAuthProvider('microsoft.com');
  signInWithPopup(getAuth(), provider).then((result) => {
    console.log(result);
    router.push("/about");
    alert("Successfully signed in !!! ");
  }).catch((error) => {
    console.log(error);
    switch (error.code) {
      case "auth/user-disabled":
        errMsg.value = "User Disabled";
        break;
    }
  })
};

// sign with phone number
const isSignInWithPhone = ref(false);
const signInWithPhone = () => {
  isSignInWithPhone.value = true;
}

const isCode = ref(false);

const signInWithPhoneCode = () => {
  isCode.value = true;
}
const auth = getAuth();
const phoneNumber = ref("");
const code = ref("");

const initRecaptchatVerifier = () => {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  });
}



const signInWithPhoneCodeSend = () => {
  initRecaptchatVerifier();
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber.value, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("We sent SMS !!! ");
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log(error);
      window.recaptchaVerifier.render().then(function(widgetId) {
  grecaptcha.reset(widgetId);
});
    });
}

const confirmCode = () => {
  code = getCodeFromUserInput();
  confirmationResult.confirm(code.value);
  router.push("/aubout");
  alert("Successfully signed in !!! ");
}











</script>