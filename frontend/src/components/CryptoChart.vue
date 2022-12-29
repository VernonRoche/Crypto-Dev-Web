<template>
  <div>
      <Line v-if="loaded" :data="chartData" :options="options" />
      <div id="chartTimeButton" class="inline-flex">
        <button v-on:click="changeTimeUnit('day')" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-l">
          Jours
        </button>
        <button v-on:click="changeTimeUnit('week')" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-r">
          Semaines
        </button>
        <button v-on:click="changeTimeUnit('month')" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-l">
          Mois
        </button>
        <button v-on:click="changeTimeUnit('year')" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-l">
          Années
        </button>
      </div>
  </div>
</template>

<script lang="ts">
import {createCryptoData}  from "@/stores/CryptoChartData";
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import 'chart.js/auto';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
function changeTimeUnit(unit:string='day'){
  if(this.chartData){
    this.options.scales['x']['time']['unit'] = unit;
  }
}
function randomColor(){
  return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0').toUpperCase(); 
} 
export default{
  name: "CryptoChart",
  components: { Line },
  data: () => ({
    loaded: false,
    chartData: null,
    options: {
    plugins: {
        title: {
            text: "Crypto Chart",
            display: true
        }
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day'
            },
            title: {
                display: true,
                text: 'Date'
            }
        },
        y: {
            title: {
                display: false,
                text: 'value'
            }
        }
    },
    responsive: true,
    lineTension: 1,
    maintainAspectRation: true,
}, 
  }),
  methods: {
    changeTimeUnit: changeTimeUnit,
  },
  async mounted(){
    this.loaded = false;
    try {
      await createCryptoData().then( (data) => {
        let datasetList:Array<Object> = []; 
        for (const key in data[0]) {
          datasetList.push(          
          {
            label: key,
            data: data[0][key],
            backgroundColor: randomColor(),
            borderColor: randomColor(),
            color: randomColor(),
          });
        }        
        this.chartData = {
          labels: data[1]["prices"],
          datasets: datasetList,  
        }; 
        this.loaded = true; 
      });
    } catch (error) {
      console.error(error);
    }
  }
}
</script>