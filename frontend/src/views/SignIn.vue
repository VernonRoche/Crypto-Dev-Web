<template>
  <h1>Sign In an account</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="text" placeholder="Password" v-model="password"/></p>
  <p v-if="errMSG">{{errMSG}}</p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign in With Google</button></p>


</template>


<script setup>
import { ref } from 'vue';
import { getAuth ,signInWithEmailAndPassword , GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref();
const register =  () => {
  signInWithEmailAndPassword(getAuth(),email.value,password.value)
      .then((data) => {
        console.log("Successfully signed in !!! ");
        router.push("/feed");
      })
      .catch((error) => {
        console.log(error.code);
        switch(error.code){
          case "auth/invalid-email":
            errMSG.value = "Invalid Email";
            break;
          case "auth/user-not-found":
            errMSG.value = "User Not Found";
            break;
          case "auth/wrong-password":
            errMSG.value = "Wrong Password";
            break;
          default:
            errMsg.value = 'Email or password was incorrect';
            break;
        }
      })
};
const signInWithGoogle = () => {
  // const provider  = new GoogleAuthProvider();
  //  signInWithPopup(getAuth(),provider).then((result) => {
  //      console.log(result);
  //      router.push("/about");
  //  }).catch((error) => {
  //      console.log(error);
  //  })
};

</script>