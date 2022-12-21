<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <h1>Hello {{ user?.displayName || user?.phoneNumber || user?.email }}</h1>
      <br />
      <button @click="clickchangedMail">Changer l'adresse mail</button>
      <br />
      <div id="myDiv" class="hidden" v-if="ischangedMail">
        <input
          type="text"
          placeholder="enter the new address"
          v-model="email"
        />
        <br />
        <button @click="changeAdresseMail">confirmer</button>
      </div>
      <br />
      <button @click="clickchangedPassWord">Changer le mot de passe</button>
      <br />
      <div id="myDiv2" class="hidden" v-if="ischangedPassword">
        <input
          type="text"
          placeholder="enter the new PassWord"
          v-model="newPassword"
        />
        <br />
        <button @click="changepassWord">confirmer</button>
      </div>
      <br />
      <button @click="clickDeleteAccount">Supprimer mon compte</button>
      <br />
      <div id="myDiv3" class="hidden" v-if="isdelete">
        <h1>confirmer</h1>
        <button @click="deleteAccount">oui</button>
      </div>
      <br />

      <button class="popup-close" @click="handlePopupAccount">
        close popup
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { popupTriggerAccount, handlePopupAccount } from "../types/popup";

import router from "@/router";
import { ref } from "vue";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
const email = ref("");
const newPassword = ref("");
const ischangedMail = ref(false);
const ischangedPassword = ref(false);
const isdelete = ref(false);

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
} else {
  console.log("user not found");
}

onAuthStateChanged(auth, (user: any) => {
  if (user) {
    const uid = user.uid;
  } else {
    console.log("user not found");
  }
});

const clickchangedMail = () => {
  ischangedMail.value = true;
  const div = document.querySelector("#myDiv");
  div?.classList.toggle("hidden");
};

const changeAdresseMail = () => {
  updateEmail(user as any, email.value)
    .then(() => {
      sendEmailVerification(user as any).then(() => {
        console.log("Successfully signed in !!! ");
        alert("Mail updated");
      });
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
};

const clickchangedPassWord = () => {
  ischangedPassword.value = true;
  const div = document.querySelector("#myDiv2");
  div?.classList.toggle("hidden");
};

const changepassWord = () => {
  updatePassword(user as any, newPassword.value)
    .then(() => {
      console.log("Successfully updated password");
      alert("Successfully updated password");
      sendPasswordResetEmail(auth, email.value).then(() => {
        alert("Mail reset password end");
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
const clickDeleteAccount = () => {
  isdelete.value = true;
  const div = document.querySelector("#myDiv3");
  div?.classList.toggle("hidden");
};

const deleteAccount = () => {
  deleteUser(user as any)
    .then(() => {
      console.log("account deleted");
      alert("account deleted");
      router.push("/");
    })
    .catch((error) => {});
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
