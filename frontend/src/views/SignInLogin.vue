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
  <p><button @click="signInWithphone">Sign with Smartphone</button></p>
  <div v-if="isSignInWithPhone">
    <div id="recaptcha-container" style="background-color:#1b1a1a;width:300px;margin:auto;"></div>
    <p><input type="text" placeholder="Phone Number" v-model="phoneNumber" /></p>
    <p><button @click="sendCode">Send Code</button></p>
    <p><input type="text" placeholder="Code" v-model="code" /></p>
    <p><button @click="confirmCode">Confirm Code</button></p>
  </div>
  <br />
  <div v-if="smsSent" style="background-color:#1b1a1a;width:300px;height:180px;margin:auto; border-radius:10px;">
            <div style="background-color:black">
            <label style="font:family:system-ui;font-size: x-large;">Enter Otp</label>
            </div>
            <br>
            <div>
            <input type="text" placeholder="Enter Otp" v-model="otp">
            </div>
            <br>
            <div>
            <button @click="verifyOtp">Verify</button>
            <button @click="sendOtp()">Resend OTP</button>
            </div>
        </div>

  <p><button @click="signInWithGoogle">Sign with <img src="../assets/Google_ G _Logo.svg.png" width="50"
        height="50"></button></p>
  <p><button @click="signInWithMicrosoft">Sign with <img src="../assets/Microsoft_logo.svg.png" width="50"
        height="50"></button></p>
  <p><button @click="signOnlyLinkEmail">Sign with link email <img src="../assets/Mail_(Apple)_logo.png" width="50" height="50" ></button></p>
  <div v-if="linksent" >
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><button @click="signInWithLinkEmail">Sign with link email</button></p>
  </div>


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
      router.push("/feed");
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
      router.push("/home");
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
    url: 'http://localhost:5173/home',
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
    router.push("/home");
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
    router.push("/home");
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

const number = ref("");
const smsSent = ref(false);
const otp = ref("");
const recaptchaVerifier = ref("");
const recaptchaWidgetId = ref("");




const signInWithphone = () => {
  recaptchaVerifier.value = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  });
  recaptchaVerifier.value.render().then(function (widgetId) {
    recaptchaWidgetId.value = widgetId;
  });
  smsSent.value = true;
  signInWithPhoneNumber(getAuth(), number.value, recaptchaVerifier.value)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      console.log("SMS sent");
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log(error);
    });
};
// const signInWithphone = () => {
//   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
//             this.recaptchaVerifier.render().then((widgetId)=>{
//             this.recaptchaWidgetId = widgetId    
//             })
            
//             var number = this.phoneNumber            
//             firebase.auth().signInWithPhoneNumber(number,this.recaptchaVerifier)
//             .then((confirmationResult)=>{                
//                 this.confirmResult = confirmationResult
//                 console.log(this.confirmResult)
//                 alert("Sms Sent!")
//                 this.smsSent=true
//             })
//             .catch((error)=>{
//                 console.log("Sms not sent",error.message)
//             })
// };

const verifyOtp = () => {
  const auth = getAuth();
  const appVerifier = window.recaptchaVerifier;
  const confirmationResult = window.confirmationResult;
  confirmationResult.confirm(otp.value).then((result) => {
    console.log(result);
    router.push("/home");
    alert("Successfully signed in !!! ");
  }).catch((error) => {
    console.log(error);
  });
};

const sendOtp = () => {
  const auth = getAuth();
  const appVerifier = window.recaptchaVerifier;
  const confirmationResult = window.confirmationResult;
  confirmationResult
    .confirm(otp.value)
    .then((result) => {
      console.log(result);
      router.push("/home");
      alert("Successfully signed in !!! ");
    })
    .catch((error) => {
      console.log(error);
    });
};





</script>