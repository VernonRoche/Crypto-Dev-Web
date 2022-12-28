<template>
<div>
    <canvas id="CryptoChart"></canvas>
</div>
</template>

<script lang="ts">
import CryptoChartData from "@/stores/CryptoChartData";
import Chart from "chart.js/auto";
export default
{
  name: "CryptoChart",
  data() {
    return {
        CryptoChartData: CryptoChartData
    }
  },
  mounted() {
    const ctx = document.getElementById("CryptoChart");    
    new Chart(ctx,this.CryptoChartData);
  }
}
</script>