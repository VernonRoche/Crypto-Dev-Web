<template>
  <!--
      This component uses @tailwindcss/forms
    
      yarn add @tailwindcss/forms
      npm install @tailwindcss/forms
    
      plugins: [require('@tailwindcss/forms')]
    -->

  <div class="popup bg-gray-900">
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

          <form action="#" class="mt-8 grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <label
                for="Email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Email
              </label>

              <input
                required
                type="email"
                id="Email"
                name="email"
                v-model="email"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="Password"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>

              <input
                required
                type="password"
                id="Password"
                name="password"
                v-model="password"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>

            <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>

            <div class="col-span-6 sm:col-span-3" v-if="cpt >= 3">
              <button @click="resetPassWord">Reinitialiser Mot De Passe</button>
              <div v-if="isResetPassWord">
                <p>
                  <input type="text" placeholder="Email" v-model="email2" />
                </p>
              </div>
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                @click="sign"
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              >
                Sign-in
              </button>
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

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
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

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                @click="signOnlyLinkEmail"
              >
                <img
                  src="@/assets/Mail_(Apple)_logo.png"
                  width="50"
                  height="50"
                  alt=""
                />
              </button>
              <div id="myDiv2" class="hidden" v-if="linksent">
                <p>
                  <input type="text" placeholder="Email" v-model="email2" />
                </p>
                <p>
                  <button @click="signInWithLinkEmail">
                    Sign with link email
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
  <button class="popup-close btn btn-primary" @click="handlePopupLogin">
    close popup
  </button>
</template>

<script setup lang="ts">
import { handlePopupLogin } from "@/types/popup";
import { ref } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";

const email = ref("");
const email2 = ref("");
const password = ref("");
const errMsg = ref();

const user = getAuth().currentUser;

let cpt = 0;

const sign = () => {
  console.log("cpt " + cpt);
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((_data) => {
      console.log("Successfully signed in !!! ");
      alert("Successfully signed in !!!");
      cpt = 0;
    })
    .catch((error) => {
      const obj: Record<string, string> = {
        "auth/invalid-email": "Invalid Email",
        "auth/user-not-found": "User Not Found",
        "auth/wrong-password": "Wrong Password",
        "auth/user-disabled": "User Disabled",
      };
      const message = obj[error.code];
      if (!message) {
        errMsg.value = error.message;
        cpt++;
      } else {
        errMsg.value = message;
      }
      if (message == "Wrong Password") {
        cpt++;
      }
      console.log(error.code);
    });
};

//reset Pasword

const isResetPassWord = ref(false);

const isReset = () => {
  isResetPassWord.value = true;
};

const resetPassWord = () => {
  const auth = getAuth();
  const emailAddress = email.value;
  sendPasswordResetEmail(auth, emailAddress)
    .then(() => {
      alert("Email sent");
      isReset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
};

// sign with link to email
const linksent = ref(false);
const signOnlyLinkEmail = () => {
  linksent.value = true;
  const div = document.querySelector("#myDiv2");
  div?.classList.toggle("hidden");
};

const signInWithLinkEmail = () => {
  const auth = getAuth();
  const actionCodeSettings = {
    url: "http://localhost:5173/about",
    handleCodeInApp: true,
  };
  sendSignInLinkToEmail(auth, email2.value, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignIn", email.value);
      alert("Email sent");
    })
    .catch((error) => {
      const obj: Record<string, string> = {
        "auth/invalid-email": "Invalid Email",
        "auth/user-not-found": "User Not Found",
        "auth/wrong-password": "Wrong Password",
        "auth/user-disabled": "User Disabled",
      };
      const message = obj[error.code];
      if (!message) {
        errMsg.value = "Email or password was incorrect";
      } else {
        errMsg.value = message;
      }
      console.log(error.code);
    });
};

//google
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

// sign with phone number

const isSignInWithPhone = ref(false);
const signInWithPhone = () => {
  isSignInWithPhone.value = true;
  const div = document.querySelector("#myDiv");
  div?.classList.toggle("hidden");
};

const isCode = ref(false);

const signInWithPhoneCode = () => {
  isCode.value = true;
};
const auth = getAuth();
const phoneNumber = ref("");
const code = ref("");

const initRecaptchatVerifier = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      // 'size': 'normal',
      // 'callback': (_response: any) => {
      // }
    },
    auth
  );
};

const signInWithPhoneCodeSend = () => {
  initRecaptchatVerifier();
  signInWithPhoneCode();
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber.value, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("We sent SMS !!! ");
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
      console.log(error);
    });
};

const confirmCode = () => {
  const confirmationResult = window.confirmationResult;
  confirmationResult
    .confirm(code.value)
    .then((result: { user: any }) => {
      // User signed in successfully.
      const user = result.user;
      //useridentity();
      alert("User signed in successfully !!! ");
    })
    .catch((error: any) => {
      console.log(error);
    });
};
</script>

<style scoped></style>
