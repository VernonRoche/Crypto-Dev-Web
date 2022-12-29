<template>
  <div id="container">
      <Line v-if="loaded" :data="chartData" />
  </div>
</template>

<script lang="ts">
import {createCryptoData}  from "@/stores/CryptoChartData";
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import 'chart.js/auto';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default{
  name: "CryptoChart",
  components: { Line },
  data: () => ({
    loaded: false,
    chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          },
          {
            label: 'Data two',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          },
          {
            label: 'Data three',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          },
        ]
      }
  }),
  async mounted(){
    this.loaded = false;
    try {
      createCryptoData().then((e) => {
        for(const key in e){          
          this.chartData = {
            labels: e["labels"],
            datasets: e["datasets"] 
          }; 
        }
      });      
      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>