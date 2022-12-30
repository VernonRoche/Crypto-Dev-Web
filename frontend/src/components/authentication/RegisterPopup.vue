<template>
  <!--
    This component uses @tailwindcss/forms
  
    yarn add @tailwindcss/forms
    npm install @tailwindcss/forms
  
    plugins: [require('@tailwindcss/forms')]
  -->

  <!-- <div class="popup bg-gray-900">
    <div class="popup-inner lg:grid lg:min-h-screen lg:grid-cols-12">
      <section
        class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt="Night"
          src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          class="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div class="hidden lg:relative lg:block lg:p-12">
          <a class="block text-white" href="/">
            <span class="sr-only">Home</span>
            <img
              class="h-16 w-auto"
              src="https://media.discordapp.net/attachments/1042336221948551168/1054513351763439727/imageedit_8_5179903478.png"
              alt="Logo"
            />
          </a>

          <h2
            class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
          >
            Welcome to Cryptohub
          </h2>

          <p class="mt-4 leading-relaxed text-white/90">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            nam dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
        </div>
      </section>

      <main
        aria-label="Main"
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <div class="relative -mt-16 block lg:hidden">
            <a
              class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 dark:bg-gray-900 sm:h-20 sm:w-20"
              href="/"
            >
              <span class="sr-only">Home</span>
              <img
                class="h-16 w-auto"
                src="https://media.discordapp.net/attachments/1042336221948551168/1054513351763439727/imageedit_8_5179903478.png"
                alt="Logo"
              />
            </a>

            <h1
              class="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl"
            >
              Welcome to Cryptohub
            </h1>

            <p class="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>

          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              @click="signInWithGoogle"
            >
              <img
                src="@/assets/Google_ G _Logo.svg.png"
                width="50"
                height="50"
                alt=""
              />
            </button>
          </div>
          <br /> -->

          <!-- <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              @click="signInWithMicrosoft"
            >
              <img
                src="@/assets/Microsoft_logo.svg.png"
                width="50"
                height="50"
                alt=""
              />
            </button>
          </div>
          <br /> -->
          

          <!-- <div class="col-span-6 text-white">
            <label
              for="Email"
              class="text-zinc-50 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              v-model="email"
              class="input-primary mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <br />
          <div class="col-span-6 sm:col-span-3">
            <label
              for="Password"
              class="text-zinc-50 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>

            <input
              type="password"
              id="Password"
              name="password"
              v-model="password"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <br />
          <div class="col-span-6 sm:col-span-3">
            <label
              for="PasswordConfirmation"
              class="text-zinc-50 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              v-model="password2"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              @click="register"
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
            >
              Create an account
            </button>
            <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>

            <p
              class="text-zinc-50 mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
            >
              Already have an account?

              <button
                @click="onOkClick"
                class="text-gray-700 underline dark:text-gray-200"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
  <button class="popup-close btn btn-primary" @click="handlePopupRegister">
    close popup
  </button> -->


  <label for="my-modal" class="btn btn-primary">Register</label>


  <input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal" id="my-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Register</h3>
    <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              @click="signInWithGoogle"
            >
              <img
                src="@/assets/Google_ G _Logo.svg.png"
                width="50"
                height="50"
                alt=""
              />
            </button>
          </div>
          <br />
          <div class="col-span-6 text-white">
            <label
              for="Email"
              class="text-zinc-50 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              v-model="email"
              class="input-primary mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <br />
          <div class="col-span-6 sm:col-span-3">
            <label
              for="Password"
              class="text-zinc-50 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>

            <input
              type="password"
              id="Password"
              name="password"
              v-model="password"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <br />
          <div class="col-span-6 sm:col-span-3">
            <label
              for="PasswordConfirmation"
              class="text-zinc-50 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              v-model="password2"
              class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              @click="register"
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
            >
              Create an account
            </button>
            <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
            <p
              class="text-zinc-50 mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
            >
              Already have an account?

              <button
                @click="onOkClick"
                class="text-gray-700 underline dark:text-gray-200"
              >
                Log in
              </button>
            </p>

          </div>
    <div class="modal-action">
      <label for="my-modal" class="btn">Close</label>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
import {
  handlePopupRegister,
  handlePopupLogin,
  popupTriggerLogin,
  popupTriggerRegister,
} from "@/types/popup";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";
import { ref } from "vue";
import LoginPopup from "@/components/authentication/LoginPopup.vue";

// register
const email = ref("");
const password = ref("");
const password2 = ref("");
const errMsg = ref();

const onOkClick = () => {

};

const register = () => {
  if (password.value !== password2.value) {
    errMsg.value = "Passwords is different";
  } else {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((_data) => {
        console.log("Successfully registered !!! ");

        alert("Successfully registered !!! ");
      })
      .catch((error) => {
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
  }
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result);

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
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const idToken = credential?.idToken;
      console.log(result);
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
</script>

<style scoped></style>
