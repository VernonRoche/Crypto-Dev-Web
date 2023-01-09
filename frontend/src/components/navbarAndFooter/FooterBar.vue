<template>
  <footer aria-label="Site Footer" class="bg-gray-900">
    <div
      class="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24"
    >
      <div
        class="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8"
      >
        <a
          class="inline-block rounded-full p-2 shadow transition bg-gray-700 text-teal-300 hover:bg-gray-600 sm:p-3 lg:p-4"
          href="#"
        >
          <span class="sr-only">Back to top</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#c084fc"
          >
            <path
              fill-rule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>

      <IconCryptohubLogo />
      <div class="lg:flex lg:items-end lg:justify-between">
        <div>
          <p
            class="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400 lg:text-left"
          >
            This is a student project in the Développement Web course of the
            second year of a Master's Degree in the University of Bordeaux. The
            aim is to create a website that allows you to follow the evolution
            of cryptocurrencies.
          </p>
        </div>

        <nav aria-label="Footer Nav" class="mt-12 lg:mt-0">
          <ul
            class="flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12"
          ></ul>
        </nav>
      </div>

      <p class="mt-12 text-center text-sm text-gray-400 lg:text-right">
        &copy;2022 Cryptohub. All rights reserved. <br />
        Cryptohub and their respective logos are property of Hichem Chouchane,
        Vincent Samson and Alexandros Stergiou. &copy;2022 Cryptohub.
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import IconCryptohubLogo from "@/components/icons/IconCryptohubLogo.vue";

export default {
  name: "FooterBar",
  components: { IconCryptohubLogo },
};
</script>

<style scoped></style>
