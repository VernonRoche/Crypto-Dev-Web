let dateTest:Date = new Date();
let pastDate = new Date();
pastDate.setHours( dateTest.getHours() - 24);
export let option = {
    responsive: true,
    maintainAspectRation: false,
    plugins: {
        zoom: {
            zoom: {
                wheel: {
                    enabled: true
                } 
            },
            pan: {
                enabled: true,
                mode:'xy',
            }
        },
        title: {
            text: "Bitcoin Chart",
            display: true
        },
        legend: {
            display: false,
        } 
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day'
            },

            ticks:{
                autoSkip: true,
                maxTicksLimit: 10,
                beginAtZero: true,
            },
            title: {
                display: true,
                text: 'Date'
            },
        },
        y:{
            type: 'linear',
            display: true,
            position: 'left',
        },
    },
};

export default option;

/*

      <div id="chartTime" class="inline-flex">
        <button v-on:click="changeTime(1)" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-l">
          1J
        </button>
        <button v-on:click="changeTime(2)" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-r">
          5J
        </button>
        <button v-on:click="changeTime(3)" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-l">
          1m
        </button>
        <button v-on:click="changeTime(4)" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-l">
          6m
        </button>
        <button v-on:click="changeTime(5)" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-l">
          1an
        </button>
        <button v-on:click="changeTime(6)" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-l">
          5an
        </button>
        <button v-on:click="changeTime(7)" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-l">
          Max.
        </button>
*/