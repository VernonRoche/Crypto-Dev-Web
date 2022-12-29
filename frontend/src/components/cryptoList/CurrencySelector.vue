<template>
  <div>
    <label
      for="currency"
      class="block mb-2 text-sm font-medium text-white"
    ></label>
    <select
      id="currency"
      class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
    >
      <option selected>usd</option>
    </select>
  </div>
</template>

<script lang="ts">
import { CoinGeckoApi } from "@/stores/CoinGeckoApi";

function CreateSupportedCurrency(): HTMLOptGroupElement {
  let options: HTMLOptGroupElement = document.createElement("optgroup");
  const data = CoinGeckoApi.getSupportedCurrency();
  data.then((value: Array<string>) => {
    value.forEach((currency: string) => {
      let option: HTMLOptGroupElement = document.createElement("option");
      option.innerHTML = currency;
      options.append(option);
    });
  });
  return options;
}

export default {
  name: "CurrencySelector.vue",
  mounted() {
    document.getElementById("currency")?.appendChild(CreateSupportedCurrency());
  },
};
</script>

<style scoped></style>
