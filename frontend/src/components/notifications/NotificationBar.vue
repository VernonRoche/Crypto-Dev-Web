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
          <button
            class="btn btn-accent btn-outline"
            @click="addIncreaseNotification"
          >
            GO
          </button>
          <input
            ref="increaseNotificationValue"
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
          <button
            class="btn btn-accent btn-outline"
            @click="addDecreaseNotification"
          >
            GO
          </button>
          <input
            ref="decreaseNotificationValue"
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
          <button
            class="btn btn-accent btn-outline"
            @click="addValueNotification"
          >
            GO
          </button>
          <input
            ref="fixedNotificationValue"
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

<script setup>
import { CryptohubApi } from "@/stores/CryptohubApi";
import { getAuth } from "firebase/auth";
import CryptoChart from "@/components/chart/CryptoChart.vue";
import CryptoList from "@/components/cryptoList/CryptoList.vue";

const auth = getAuth();
const userId = auth.currentUser.uid;
function addIncreaseNotification() {
  const currentCurrency = CryptoChart.data().currentCurrency;
  const currentValue = CryptoList.data().cryptoPrices[currentCurrency];
  const percentage = this.$refs.increaseNotificationValue.value;
  const notificationValue = currentValue + (currentValue * percentage) / 100;

  CryptohubApi.addNotification(userId, currentCurrency, notificationValue);
}

function addDecreaseNotification() {
  const currentCurrency = CryptoChart.data().currentCurrency;
  const currentValue = CryptoList.data().cryptoPrices[currentCurrency];
  const percentage = this.$refs.increaseNotificationValue.value;
  const notificationValue = currentValue - (currentValue * percentage) / 100;

  CryptohubApi.addNotification(userId, currentCurrency, notificationValue);
}

function addValueNotification() {
  CryptohubApi.addNotification(
    userId,
    CryptoChart.data().currentCurrency,
    this.$refs.fixedNotificationValue.value
  );
}
</script>
