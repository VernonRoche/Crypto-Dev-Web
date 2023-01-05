<template>
  <div>
    <div id="chart-container" class="container h-50 w-50">
      <Line id="CryptoChart" v-if="loaded" :data="chartData" :options="options" ref="line"/>
      <div id="legendBox">
      </div>
    </div>
      <select v-model="selected" @change="changeTimeUnit(selected)"  >
        <option disabled value="">Current Unit : {{ selected }} </option>
        <option>Day</option>
        <option>week</option>
        <option>month</option>
        <option>Year</option>
      </select>
    </div>
</template>

<script lang="ts">
import {createCryptoData}  from "@/stores/CryptoChartData";
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import 'chart.js/auto';
import {option} from "@/stores/chartConfig.ts";
import zoomPlugin from 'chartjs-plugin-zoom';
import AboutView from '../views/AboutView.vue';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
ChartJS.register(zoomPlugin);
/*
1Jour : 
  let dateTest:Date = new Date();
  let pastDate = new Date();
  pastDate.setHours( dateTest.getHours() - 24);
5 jour: 
  let dateTest:Date = new Date();
  let pastDate = new Date();
  pastDate.setDate( dateTest.getDate() - 5 );
1 mois : 
  let dateTest:Date = new Date();
  let pastDate = new Date();
  pastDate.setMonth( dateTest.getMonth() - 1 );
6 mois :
  let dateTest:Date = new Date();
  let pastDate = new Date();
  pastDate.setMonth( dateTest.getMonth() - 6 );
1 an :
  let dateTest:Date = new Date();
  let pastDate = new Date();
  pastDate.setFullYear( dateTest.getFullYear() - 1 );
5 ans : 
  let dateTest:Date = new Date();
  let pastDate = new Date();
  pastDate.setFullYear( dateTest.getFullYear() - 5 );
ALL
*/
function changeTime(range:number=1){
  let dateTest:Date = new Date();
  let pastDate = new Date();
  pastDate.setFullYear( dateTest.getFullYear() - 1 );
  console.log(dateTest);
  
  console.log(pastDate);
}

function changeTimeUnit(unit:string='day'){
  console.log(unit);
  
  if(this.chartData){    
    for (const key in ChartJS.instances) {
        if(ChartJS.instances[key].canvas.id == "CryptoChart"){
          ChartJS.instances[key].options.scales["x"]["time"]["unit"] = unit;
          ChartJS.instances[key].update();
        }
    }
  }
}
function randomColor(){
  return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0').toUpperCase(); 
}

async function changeData(id:string=null,currency:string=null,from:number=null,to:number=null){
  if(id == null || currency == null){
    //initialisation de la page
    this.loaded = false;
    try {
      await createCryptoData().then( (data) => {
        let datasetList:Array<Object> = [];
        for (const key in data[0]) {
          
          let id:number = datasetList.length;
          let backgroundColor = randomColor();

            datasetList.push(          
            {
              label: key,
              data: data[0][key],
              backgroundColor: backgroundColor,
              borderColor: randomColor(),
              color: randomColor(),
              lineTension: 0,

            });
          

          let buttonLegend = document.createElement("button");
          // id="CryptoChartPrice" v-on:click="toggleData(0)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full hidden"
          buttonLegend.setAttribute("v-on:click","toggleData(0)");
          buttonLegend.setAttribute("class"," hover:bgtext-white font-bold py-2 px-4 rounded-full");
          buttonLegend.innerHTML = key;
          buttonLegend.style.backgroundColor = backgroundColor;
          buttonLegend.addEventListener("click",  () => {
            for (const key in ChartJS.instances) {
              if(ChartJS.instances[key].canvas.id == "CryptoChart"){
                const  isVisible:boolean =  ChartJS.instances[key].isDatasetVisible(id);
                if(isVisible){
                  ChartJS.instances[key].hide(id);
                }
                if(!isVisible){
                  ChartJS.instances[key].show(id);
                } 
              }
            }
          });
          document.getElementById("legendBox").appendChild(buttonLegend);
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
  }else{    
    //demande d'affichage d'une crypto 
    for (const key in ChartJS.instances) {
      if(ChartJS.instances[key].canvas.id == "CryptoChart"){        
          ChartJS.instances[key].options.plugins["title"]["text"] = id + " chart";

          try {
            await createCryptoData(id,currency,from,to).then( (data) => {
              let datasetList:Array<any> = []; 
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
              ChartJS.instances[key].data.labels =  data[1]["prices"];
              ChartJS.instances[key].data.datasets = datasetList;
            });
          } catch (error) {
            console.error(error);
          }
          ChartJS.instances[key].update();
      }
    }
  }
}
export default{
  //extends: Line,
  name: "CryptoChart",
  components: { Line },
  props: ['data'],
  data(){
    return {
      loaded: false,
      chartData: null,
      options: option,
      selected: 'day',
    }
  },
  /*
  watch:{
    options(newVal,oldVal){
        console.log("old"+oldVal);
        
    }
  },
  */
  methods: {
    changeTimeUnit: changeTimeUnit,
    changeData: changeData,
    changeTime: changeTime,
  },
  async mounted(){    
    this.changeData();
    for (const key in ChartJS.instances) {
      if(ChartJS.instances[key].canvas.id == "CryptoChart"){ 
    //CryptoChartMarketCap
    //CryptoChartTotalVolume
      }
    }  
  },
}
</script>