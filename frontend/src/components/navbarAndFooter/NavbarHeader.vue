<template>
  <header aria-label="Site Header" class="bg-white dark:bg-gray-900">
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
    >
      <a class="flex items-center text-purple-500" href="/">
        <span class="sr-only">Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50%"
          height="890.000000pt"
          viewBox="0 0 1261.000000 850.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,920.000000) scale(0.100000,-0.100000)"
            fill="#c084fc"
            stroke="none"
          >
            <path
              d="M6248 5683 c-121 -114 -313 -374 -440 -598 -108 -190 -274 -547 -352
-757 l-25 -67 97 48 c189 95 389 141 667 156 129 7 389 -8 514 -30 42 -7 77
-12 78 -11 8 8 -119 247 -136 256 -12 6 -74 15 -138 21 -109 9 -266 5 -571
-17 l-92 -7 15 43 c17 49 81 162 163 290 82 128 274 400 282 400 4 0 47 -56
95 -124 l88 -124 146 -20 c80 -11 148 -18 149 -17 7 6 -83 138 -163 240 -110
141 -304 365 -316 365 -5 0 -33 -21 -61 -47z"
            />
          </g>
        </svg>

        <h1 class="text-4xl font-extrabold text-primary">Cryptohub</h1>
      </a>

      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Site Nav" class="hidden md:block"></nav>

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <a class="btn btn-default" href="/"> Login </a>

            <a class="btn btn-primary" href="/"> Register </a>
          </div>

          <button
            class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden"
          >
            <span class="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavbarHeader.vue",
});
</script>

<style scoped></style>
