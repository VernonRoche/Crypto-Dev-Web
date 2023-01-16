<template>
<div class="inline">
  <div class="container m-auto">
    <div id="chart-container" class="container h-50 w-50">
      <Line
        id="CryptoChart"
        v-if="loaded"
        :data="chartData"
        :options="options"
        ref="line"
      />
      <div id="legendBox"></div>
    </div>
    <!-- Data range selectors -->
    <div class="flex w-full">
      <!-- Data type selector -->
      <div
        class="grid h-20 flex-auto w-1/2 card bg-base-300 rounded-box place-items-center"
      >
        <select
          class="select select-secondary select-lg"
          v-model="nbDataset"
          @change="changeDatasets(nbDataset)"
        >
          <option Value="0">Prices</option>
          <option Value="1">Market Caps</option>
          <option Value="2">Total Volumes</option>
        </select>
      </div>
      <div class="divider divider-horizontal"></div>
      <!-- Data range selector -->
      <div
        class="grid h-20 flex-auto w-1/2 card bg-base-300 rounded-box place-items-center"
      >
        <select
          class="select select-secondary select-lg"
          v-model="TimeRange"
          @change="changeTimeRange(this.TimeRange)"
        >
          <option Value="1">1 Day</option>
          <option Value="5">5 Day</option>
          <option Value="30">1 Month</option>
          <option Value="365">1 Year</option>
          <option Value="1825">5 Year</option>
        </select>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { createCryptoData } from "@/stores/ChartStores/CryptoChartData";
import { Gradient } from "@/stores/ChartStores/Gradient";
import { crosshairLine } from "@/stores/ChartStores/chartCrossHairHandle";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "chart.js/auto";
import { option } from "@/stores/ChartStores/chartConfig";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
ChartJS.register(zoomPlugin);
ChartJS.register(annotationPlugin);

function changeTimeRange(
  this: {
    changeDatasets: (nbDataset?: number) => void;
    changeData: (
      id?: string,
      currency?: string,
      nbDay?: number
    ) => Promise<void>;
    changeTimeRange: (range?: number, currency?: string) => void;
    initData: () => Promise<void>;
  },
  range: number = 1,
  currency: string = "usd"
) {
  for (const key in ChartJS.instances) {
    if (ChartJS.instances[key].canvas.id == "CryptoChart") {
      this.changeData(
        ChartJS.instances[key].data.datasets[0].id,
        currency,
        range
      );
    }
  }
}

function changeDatasets(nbDataset: number = 0) {
  for (const key in ChartJS.instances) {
    if (ChartJS.instances[key].canvas.id == "CryptoChart") {
      for (const id in ChartJS.instances[key].data.datasets) {
        ChartJS.instances[key].data.datasets[id]["hidden"] =
          parseInt(id) != nbDataset;
      }
      ChartJS.instances[key].update();
    }
  }
}

function randomColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
}

// This is the main component of the chart, it initializes the data and displays it
async function initData(this: {
  chartData: { labels: any; datasets: Object[] };
  loaded: boolean;
  changeDatasets: (nbDataset?: number) => void;
  changeData: (id?: string, currency?: string, nbDay?: number) => Promise<void>;
  changeTimeRange: (
    this: {
      changeDatasets: (nbDataset?: number | undefined) => void;
      changeData: (
        id?: string | undefined,
        currency?: string | undefined,
        nbDay?: number | undefined
      ) => Promise<void>;
      changeTimeRange: (
        range?: number | undefined,
        currency?: string | undefined
      ) => void;
      initData: () => Promise<void>;
    },
    range?: number,
    currency?: string
  ) => void;
  initData: () => Promise<void>;
}) {
  //initialisation de la page
  this.loaded = false;
  console.log(this);

  try {
    await createCryptoData().then((data) => {
      let datasetList: Array<Object> = [];
      for (const key in data[0]) {
        let backgroundColor = randomColor();
        let hid = true;
        if (key === "prices") {
          hid = false;
        }
        datasetList.push({
          hidden: hid,
          id: "bitcoin",
          label: key,
          data: data[0][key],
          backgroundColor: backgroundColor,
          fill: {
            target: {
              value: data[0][key][0],
            },
            below: (context: { chart: any }) => {
              const chart = context.chart;
              const { ctx, chartArea, data, scales } = chart;
              if (!chartArea) {
                return null;
              }
              return Gradient.getBelowGradient(ctx, chartArea, data, scales);
            },
            above: (context: { chart: any }) => {
              const chart = context.chart;
              const { ctx, chartArea, data, scales } = chart;
              if (!chartArea) {
                return null;
              }
              return Gradient.getAboveGradient(ctx, chartArea, data, scales);
            },
          },
          borderColor: (context: { chart: any }) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) {
              return null;
            }
            return Gradient.getGradient(ctx, chartArea, data, scales);
          },
          tension: 0,
          pointRadius: 0,
          pointHitRadius: 0,
          pointHoverRadius: 1,
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
  for (const key in ChartJS.instances) {
    if (ChartJS.instances[key].canvas.id == "CryptoChart") {
      ChartJS.instances[key].canvas.addEventListener("mousemove", (e) => {
        crosshairLine(ChartJS.instances[key], e);
      });
    }
  }
}

// Similarly to the initData function, this function is used to update the data of the chart instead

async function changeData(
  this: {
    TimeRange: number;
    changeDatasets: (nbDataset?: number) => void;
    changeData: (
      id?: string,
      currency?: string,
      nbDay?: number
    ) => Promise<void>;
    changeTimeRange: (
      this: {
        changeDatasets: (nbDataset?: number | undefined) => void;
        changeData: (
          id?: string | undefined,
          currency?: string | undefined,
          nbDay?: number | undefined
        ) => Promise<void>;
        changeTimeRange: (
          range?: number | undefined,
          currency?: string | undefined
        ) => void;
        initData: () => Promise<void>;
      },
      range?: number,
      currency?: string
    ) => void;
    initData: (this: {
      chartData: { labels: any; datasets: Object[] };
      loaded: boolean;
      changeDatasets: (nbDataset?: number | undefined) => void;
      changeData: (
        id?: string | undefined,
        currency?: string | undefined,
        nbDay?: number | undefined
      ) => Promise<void>;
      changeTimeRange: (
        this: {
          changeDatasets: (nbDataset?: number | undefined) => void;
          changeData: (
            id?: string | undefined,
            currency?: string | undefined,
            nbDay?: number | undefined
          ) => Promise<void>;
          changeTimeRange: (
            range?: number | undefined,
            currency?: string | undefined
          ) => void;
          initData: () => Promise<void>;
        },
        range?: number | undefined,
        currency?: string | undefined
      ) => void;
      initData: () => Promise<void>;
    }) => Promise<void>;
  },
  id: string = null,
  currency: string = "usd",
  nbDay: number = this.TimeRange
) {
  //demande d'affichage d'une crypto
  for (const key in ChartJS.instances) {
    if (ChartJS.instances[key].canvas.id == "CryptoChart") {

      try {
        ChartJS.instances[key].options.plugins["title"]["text"] = id + " chart";
        await createCryptoData(id, currency, nbDay).then((data) => {
          let datasetList: Array<any> = [];
          for (const key in data[0]) {
            let hid = true;
            if (key === "prices") {
              hid = false;
            }
            datasetList.push({
              hidden: hid,
              id: id,
              label: key,
              data: data[0][key],
              backgroundColor: randomColor(),
              fill: {
                target: {
                  value: data[0][key][0],
                },
                below: (context: { chart: any }) => {
                  const chart = context.chart;
                  const { ctx, chartArea, data, scales } = chart;
                  if (!chartArea) {
                    return null;
                  }
                  return Gradient.getBelowGradient(
                    ctx,
                    chartArea,
                    data,
                    scales
                  );
                },
                above: (context: { chart: any }) => {
                  const chart = context.chart;
                  const { ctx, chartArea, data, scales } = chart;
                  if (!chartArea) {
                    return null;
                  }
                  return Gradient.getAboveGradient(
                    ctx,
                    chartArea,
                    data,
                    scales
                  );
                },
              },
              borderColor: (context: { chart: any }) => {
                const chart = context.chart;
                const { ctx, chartArea, data, scales } = chart;
                if (!chartArea) {
                  return null;
                }
                return Gradient.getGradient(ctx, chartArea, data, scales);
              },
              tension: 0,
              pointRadius: 0,
              pointHitRadius: 0,
              pointHoverRadius: 1,
            });
          }
          ChartJS.instances[key].data.labels = data[1]["prices"];
          ChartJS.instances[key].data.datasets = datasetList;
        });
      } catch (error) {
        console.error(error);
      }
      ChartJS.instances[key].update();
    }
  }
}

let currentCurrency: string = "Bitcoin";
function changeCurrentCurrency(name: string) {
  currentCurrency = name;
}

export default {
  name: "CryptoChart",
  components: { Line },
  props: ["data"],
  data() {
    return {
      currentCurrency,
      loaded: false,
      chartData: null,
      options: option,
      nbDataset: 0,
      TimeRange: 1,
      id: "bitcoin",
    };
  },
  methods: {
    changeDatasets: changeDatasets,
    changeData: changeData,
    changeTimeRange: changeTimeRange,
    initData: initData,
    changeCurrentCurrency,
  },
  async mounted() {
    await this.initData();
  },
};
</script>
