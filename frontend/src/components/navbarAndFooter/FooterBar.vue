<template>
  <footer aria-label="Site Footer" class="bg-gray-100 dark:bg-gray-900">
    <div
      class="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24"
    >
      <div
        class="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8"
      >
        <a
          class="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 dark:bg-gray-700 dark:text-teal-300 dark:hover:bg-gray-600 sm:p-3 lg:p-4"
          href=""
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

      <div class="lg:flex lg:items-end lg:justify-between">
        <div>
          <p
            class="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400 lg:text-left"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            consequuntur amet culpa cum itaque neque.
          </p>
        </div>

        <nav aria-label="Footer Nav" class="mt-12 lg:mt-0">
          <ul
            class="flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12"
          ></ul>
        </nav>
      </div>

      <p
        class="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 lg:text-right"
      >
        Copyright &copy; 2022. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterBar",
};
</script>

<style scoped></style>
