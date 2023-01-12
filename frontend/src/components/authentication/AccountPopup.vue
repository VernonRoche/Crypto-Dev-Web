<template>
  <!-- The button to open modal -->
  <AccountButton />

  <input type="checkbox" id="my-modal-account" class="modal-toggle" />
  <!-- Put this part before </body> tag -->
  <div class="modal" id="my-modal-account">
    <div class="modal-box">
      <div class="col-span-6">
        <label for="Hello" class="block text-lg font-medium text-gray-400">
          Hello
          {{ user?.displayName || user?.phoneNumber || user?.email }}
        </label>
      </div>
      <br />

      <div class="text-zinc-50 col-span-6 sm:col-span-3">
        <button class="btn btn-primary" @click="clickchangedMail">
          Change Email
        </button>
        <div id="myDiv"  v-if="ischangedMail">
          <input
            type="text"
            placeholder="Enter the new email address"
            class="mt-1 w-full rounded-md shadow-sm border-gray-700 bg-gray-800 text-gray-200"
            v-model="email"
          />
          <br />
          <button class="btn btn-secondary" @click="changeAdresseMail">
            Confirm
          </button>
        </div>
      </div>
      <br />
      <div class="text-zinc-50 col-span-6 sm:col-span-3">
        <button class="btn btn-primary" @click="clickchangedPassWord">
          Change Password
        </button>

        <div id="myDiv2" v-if="ischangedPassword">
          <p>
            <input
              type="password"
              placeholder="Enter the new password"
              v-model="newPassword"
              class="mt-1 w-full rounded-md shadow-sm border-gray-700 bg-gray-800 text-gray-200"
            />
          </p>
          <p>
            <button class="btn btn-secondary" @click="changepassWord">
              Confirm
            </button>
          </p>
        </div>
      </div>
      <br />
      <div class="text-zinc-50 col-span-6 sm:col-span-3">
        <button @click="clickDeleteAccount" class="btn btn-error">
          Delete my account
        </button>
        <br />
        <div id="myDiv3"  v-if="isdelete">
          <br />
          <button @click="deleteAccount" class="btn btn-error btn-outline">
            Confirm
          </button>
        </div>
      </div>
      <div class="modal-action">
        <label for="my-modal-account" class="btn">Close</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getAuth,
  onAuthStateChanged,
  updateEmail,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { ref } from "vue";
import AccountButton from "@/components/authentication/AccountButton.vue";
import  {CryptohubApi}  from "@/stores/CryptohubApi";

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
  const uid = user.uid;
} else {
  onAuthStateChanged(auth, (user: any) => {
  if (user) {
    console.log("Sign-in provider: " + user.providerData[0].providerId);
    console.log("  Provider-specific UID: " + user.uid);
    console.log("  Name: " + user.displayName);
    console.log("  Email: " + user.email);
    console.log("  Photo URL: " + user.photoURL);
    
    CryptohubApi.getUser(user.uid)
    
  } else {
    console.log("user not found");
  }
});
}



const clickchangedMail = () => {
  ischangedMail.value = true;
  const div = document.querySelector("#myDiv");
  div?.classList.toggle("hidden");
};

const changeAdresseMail = () => {
  if (user == null){
    return;
  }
  updateEmail(user, email.value)
    .then(() => {
      sendEmailVerification(user).then(() => {
        console.log("Successfully signed in !!! ");
        CryptohubApi.changeEmail(user.uid, email.value);
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
  if(user == null){
    return;

  }
  deleteUser(user)
    .then(() => {
      console.log("account deleted");
      alert("account deleted + " + user.uid);
    })
    .catch((error) => {});
    CryptohubApi.deleteUser(user.uid);

};
</script>
