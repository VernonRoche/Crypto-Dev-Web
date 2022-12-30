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

          
          <div class="col-span-6">
            <label
              for="Hello"
              class="text-zinc-50 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Hello
              {{ user?.displayName || user?.phoneNumber || user?.email }}
            </label>
          </div>
          <br />

          <div class="text-zinc-50 col-span-6 sm:col-span-3">
            <button
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              @click="clickchangedMail"
            >
              Changer l'adresse mail
            </button>
            <div id="myDiv" class="hidden" v-if="ischangedMail">
              <input
                type="text"
                placeholder="enter the new address"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                v-model="email"
              />
              <br />
              <button
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                @click="changeAdresseMail"
              >
                confirmer
              </button>
            </div>
          </div>
          <br />
          <div class="text-zinc-50 col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              @click="clickchangedPassWord"
            >
              Changer le mot de passe
            </button>

            <div id="myDiv2" class="hidden" v-if="ischangedPassword">
              <p>
                <input
                  type="text"
                  placeholder="enter the new PassWord"
                  v-model="newPassword"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </p>
              <p>
                <button
                  class="text-zinc-50 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                  @click="changepassWord"
                >
                  confirmer
                </button>
              </p>
            </div>
          </div>
          <br />
          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              @click="clickDeleteAccount"
              class="text-zinc-50 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
            >
              Supprimer mon compte
            </button>
            <br />
            <div id="myDiv3" class="hidden" v-if="isdelete">
              <br />
              <h1>confirmer</h1>
              <button
                @click="deleteAccount"
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              >
                oui
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <button class="popup-close btn btn-primary" @click="handlePopupAccount">
    close popup
  </button> -->


  <!-- The button to open modal -->
<a href="#my-modal-2" class="btn">Myaccount</a>
<!-- Put this part before </body> tag -->
<div class="modal" id="my-modal-2">
  <div class="modal-box">
    <div class="col-span-6">
            <label
              for="Hello"
              class="text-zinc-50 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Hello
              {{ user?.displayName || user?.phoneNumber || user?.email }}
            </label>
          </div>
          <br />

          <div class="text-zinc-50 col-span-6 sm:col-span-3">
            <button
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              @click="clickchangedMail"
            >
              Changer l'adresse mail
            </button>
            <div id="myDiv" class="hidden" v-if="ischangedMail">
              <input
                type="text"
                placeholder="enter the new address"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                v-model="email"
              />
              <br />
              <button
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                @click="changeAdresseMail"
              >
                confirmer
              </button>
            </div>
          </div>
          <br />
          <div class="text-zinc-50 col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              @click="clickchangedPassWord"
            >
              Changer le mot de passe
            </button>

            <div id="myDiv2" class="hidden" v-if="ischangedPassword">
              <p>
                <input
                  type="text"
                  placeholder="enter the new PassWord"
                  v-model="newPassword"
                  class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </p>
              <p>
                <button
                  class="text-zinc-50 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                  @click="changepassWord"
                >
                  confirmer
                </button>
              </p>
            </div>
          </div>
          <br />
          <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              @click="clickDeleteAccount"
              class="text-zinc-50 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
            >
              Supprimer mon compte
            </button>
            <br />
            <div id="myDiv3" class="hidden" v-if="isdelete">
              <br />
              <h1>confirmer</h1>
              <button
                @click="deleteAccount"
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              >
                oui
              </button>
            </div>
          </div>
    <div class="modal-action">
     <a href="#" class="btn">Close</a>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { handlePopupAccount } from "@/types/popup";
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
import { ref } from "vue";

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
    })
    .catch((error) => {});
};
</script>
