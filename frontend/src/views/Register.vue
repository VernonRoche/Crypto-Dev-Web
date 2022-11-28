<template>
  <h1>Create an account</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="text" placeholder="Password" v-model="password"/></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign in With Google</button></p>
  <p><input type="text" placeholder="Number" v-model="number"></p>
  <p><button @click="">Sign with Smartphone</button></p>


</template>


<script setup>
import { ref } from 'vue';
import { getAuth , createUserWithEmailAndPassword , GoogleAuthProvider,signInWithPopup , RecaptchaVerifier } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const router = useRouter();
const number = ref("");
const register =  () => {
  createUserWithEmailAndPassword(getAuth(),email.value,password.value)
      .then((data) => {
        console.log("Successfully registered !!! ");
        router.push("/about");
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      })
};
const signInWithGoogle = () => {
  const provider  = new GoogleAuthProvider();
  signInWithPopup(getAuth(),provider).then((result) => {
    console.log(result);
    router.push("/about");
  }).catch((error) => {
    console.log(error);
  })
};

const auth  = getAuth();
auth.languageCode = 'it';

</script>