<template>
  <!-- The button to open modal -->
  <AccountButton />

  <input type="checkbox" id="my-modal-account" class="modal-toggle" />
  <div class="modal" id="my-modal-account">
    <div class="modal-box">
      <div class="col-span-6">
        <label for="Hello" class="block text-lg font-medium text-gray-400">
          Hello
          {{ user?.displayName }}
        </label>
      </div>
      <br />

      <!-- Buttons to change user information, clicking on one brings up an input and a confirmation button -->
      <div class="text-zinc-50 col-span-6 sm:col-span-3">
        <button class="btn btn-primary" @click="clickchangedMail">
          Change Email
        </button>
        <div id="myDiv" v-if="ischangedMail">
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
        <div id="myDiv3" v-if="isdelete">
          <br />
          <button @click="deleteAccount" class="btn btn-error btn-outline">
            Confirm
          </button>
        </div>
      </div>
      <!-- Button to close modal -->
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
import { Login } from "@/stores/login";
import {countsignGoogle, decrementGoogle, isconnectedwithgoogle} from "@/stores/counter";


//Initialize user variables
const auth = getAuth();
const user = auth.currentUser;
const email = ref<string>("");
const newPassword = ref<string>("");
const ischangedMail = ref<boolean>(false);
const ischangedPassword = ref<boolean>(false);
const isdelete = ref<boolean>(false);

/**
 * information about the current user
 */
if (user !== null) {
  const displayName = user.displayName;
  const emailUser = user.email;
  const photoURL = user.photoURL;
  const uid = user.uid;
} else {
  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      console.log("user not found");
    }
  if (user) {
    console.log("Sign-in provider: " + user.providerData[0].providerId);
    console.log("  Provider-specific UID: " + user.uid);
    console.log("  Name: " + user.displayName);
    console.log("  Email: " + user.email);
    console.log("  Photo URL: " + user.photoURL);

    CryptohubApi.getUser(user.uid)

  }
});
}


/**
 * confirm user clicked on change email button and display input field for new email
 */
const clickchangedMail = () => {
  ischangedMail.value = true;
  const div = document.querySelector("#myDiv");
  div?.classList.toggle("hidden");
};

/**
 * change the email address of the user and send a verification email to the new address and change the new email in the database
 */
const changeAdresseMail = () => {
  if (user == null){
    return;
  }
  updateEmail(user, email.value)
    .then(() => {
      sendEmailVerification(user).then(() => {
        CryptohubApi.changeEmail(user.uid, email.value);
        alert("Mail sent to verify new email address");
      });
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
};

/**
 * confirm user clicked on change password button and display input field for new password
 */
const clickchangedPassWord = () => {
  ischangedPassword.value = true;
  const div = document.querySelector("#myDiv2");
  div?.classList.toggle("hidden");
};

/**
 * change the password of the user and send a reset password email .
 */
const changepassWord = () => {
  if(user == null) {
    return;
  }
  updatePassword(user, newPassword.value)
    .then(() => {
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

/**
 * confirm user clicked on delete account button and display confirmation button
 */
const clickDeleteAccount = () => {
  isdelete.value = true;
  const div = document.querySelector("#myDiv3");
  div?.classList.toggle("hidden");
};

/**
 * delete the user account and return to the Home page and delete the user in the database
 */
const deleteAccount = () => {
  if(user == null){
    return;

  }
  if (isconnectedwithgoogle.value == true) {
    decrementGoogle();
    isconnectedwithgoogle.value = false;
  }
  deleteUser(user)
    .then(() => {
      console.log("account deleted");
      Login.changeStateLogin()
    })
    .catch((error) => {});
    CryptohubApi.deleteUser(user.uid);

};
</script>
