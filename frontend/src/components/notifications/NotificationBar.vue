<template>
  <div
    class="text-3xl font-bold text-secondary underline underline-offset-8 content-center w-full h-full my-3 py-3"
    style="text-align: center"
  >
    Receive a price notification
  </div>

  <div class="flex w-full my-3 py-3">
    <div
      class="grid h-20 flex-auto w-1/3 card bg-base-300 rounded-box place-items-center"
    >
      After increase of
      <div class="form-control">
        <label class="input-group">
          <button class="btn btn-accent btn-outline">GO</button>
          <input
            type="text"
            placeholder="3"
            class="input input-bordered input-accent"
          />
          <span class="badge-accent">%</span>
        </label>
      </div>
    </div>
    <div class="divider divider-horizontal">OR</div>
    <div
      class="grid h-20 flex-auto w-1/3 card bg-base-300 rounded-box place-items-center"
    >
      After decrease of
      <div class="form-control">
        <label class="input-group">
          <button class="btn btn-accent btn-outline">GO</button>
          <input
            type="text"
            placeholder="3"
            class="input input-bordered input-accent"
          />
          <span class="badge-accent">%</span>
        </label>
      </div>
    </div>
    <div class="divider divider-horizontal">OR</div>
    <div
      class="grid h-20 flex-auto w-1/3 card bg-base-300 rounded-box place-items-center"
    >
      After reaching
      <div class="form-control">
        <label class="input-group">
          <button class="btn btn-accent btn-outline">GO</button>
          <input
            type="text"
            placeholder="100"
            class="input input-bordered input-accent"
          />
          <span class="badge-accent">USD</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup></script>
