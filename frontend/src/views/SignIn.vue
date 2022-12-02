<template>
  <h1>Sign In an account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="text" placeholder="Password" v-model="password" /></p>
  <p><button @click="sign">Sign</button></p>
  <p><button @click="register">Register</button></p>
  <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
  <!--  <p><input type="text" placeholder="Number" v-model="number"></p>
  <p><button @click="signInWithGoogle">Sign with Smartphone</button></p> -->
  <p><button @click="signInWithGoogle">Sign with <img src="../assets/Google_ G _Logo.svg.png" width="50"
        height="50"></button></p>


</template>


<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref();
const number = ref("");
// sign 
const sign = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully signed in !!! ");
      router.push("/feed");
      alert("Successfully signed in !!!")
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


</script>