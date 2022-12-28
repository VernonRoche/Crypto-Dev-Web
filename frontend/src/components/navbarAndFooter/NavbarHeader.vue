<template>
  <header aria-label="Site Header" class="bg-gray-900">
    <div
      class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
    >
      <a class="flex items-center text-purple-500" href="/">
        <span class="sr-only">Home</span>
        <IconCryptohubLogo />
      </a>

      <div
        class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
      >
        <h1 class="text-4xl font-extrabold text-primary content-center">
          Cryptohub
        </h1>
      </div>

      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Site Nav" class="hidden md:block"></nav>

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <a class="btn btn-default" href="/"> Login </a>

            <a class="btn btn-primary" href="/"> Register </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconCryptohubLogo from "@/components/icons/IconCryptohubLogo.vue";

export default defineComponent({
  name: "NavbarHeader.vue",
  components: { IconCryptohubLogo },
});
</script>

<style scoped></style>
