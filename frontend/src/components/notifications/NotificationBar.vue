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
            name="increaseNotificationValue"
            v-model="increaseNotificationValue"
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
            name="decreaseNotificationValue"
            v-model="decreaseNotificationValue"
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
            name="fixedNotificationValue"
            v-model="fixedNotificationValue"
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

<script setup lang="ts">
import { CryptohubApi } from "@/stores/CryptohubApi";
import { getAuth } from "firebase/auth";
import CryptoChart from "@/components/chart/CryptoChart.vue";
import CryptoList from "@/components/cryptoList/CryptoList.vue";
import { ref } from "vue";

const auth = getAuth();
const userId = auth.currentUser!.uid;
const increaseNotificationValue = ref<number>("");
const decreaseNotificationValue = ref<number>("");
const fixedNotificationValue = ref<number>("");
function addIncreaseNotification() {
  const currentCurrency = CryptoChart.data().currentCurrency;
  const cryptoPrices = CryptoList.data().cryptoPrices;
  for (const cryptoPrice of cryptoPrices) {
    if (cryptoPrice.name === currentCurrency) {
      const currentPrice = cryptoPrice.price;
      const percentage = increaseNotificationValue.value;
      const notificationValue =
        currentPrice + (currentPrice * percentage) / 100;
      CryptohubApi.addNotification(userId, currentCurrency, notificationValue);
      return;
    }
  }
}

function addDecreaseNotification() {
  const currentCurrency = CryptoChart.data().currentCurrency;
  const cryptoPrices = CryptoList.data().cryptoPrices;
  for (const cryptoPrice of cryptoPrices) {
    if (cryptoPrice.name === currentCurrency) {
      const currentPrice = cryptoPrice.price;
      const percentage = increaseNotificationValue.value;
      const notificationValue =
        currentPrice - (currentPrice * percentage) / 100;
      CryptohubApi.addNotification(userId, currentCurrency, notificationValue);
      return;
    }
  }
}

function addValueNotification() {
  CryptohubApi.addNotification(
    userId,
    CryptoChart.data().currentCurrency,
    fixedNotificationValue.value
  );
}
</script>
