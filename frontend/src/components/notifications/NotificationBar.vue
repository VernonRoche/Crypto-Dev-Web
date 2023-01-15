<template>
  <div
    class="text-2xl font-bold text-secondary overline content-center w-full h-full my-3 py-3"
    style="text-align: center"
  >
    Receive a price notification
  </div>

  <div class="flex w-full my-3 py-3">
    <div
      class="grid h-20 flex-auto w-1/3 card bg-base-300 rounded-box place-items-center"
    >
      after x increase
    </div>
    <div class="divider divider-horizontal">OR</div>
    <div
      class="grid h-20 flex-auto w-1/3 card bg-base-300 rounded-box place-items-center"
    >
      after x decrease
    </div>
    <div class="divider divider-horizontal">OR</div>
    <div
      class="grid h-20 flex-auto w-1/3 card bg-base-300 rounded-box place-items-center"
    >
      after reaching x value
    </div>
  </div>
</template>

<script setup></script>
