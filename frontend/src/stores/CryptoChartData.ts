import { CoinGeckoApi }  from "../stores/CoinGeckoApi"
import 'chartjs-adapter-luxon';

export async function createCryptoData() {

    let datasets:Array<object>  = [];
    let labels:Array<string> = []; 
    const data  =  CoinGeckoApi.getCryptoMarketChartRange("bitcoin","usd",1392577232,1422577232);
    await data.then( (value:Array<string>) => {
        for(const key in value){
            let datas:Array<number> = [];
            /*
            key : 
                prices
                market_caps
                total_volumes
            */
            value[key].forEach(element => {
                datas.push(element[1]);
                labels.push(new Date(element[0]));
            });
            datasets.push({
                label: key,
                backgroundColor:  "#f87979",
                data: datas,
                //borderColor: "rgba(0,0,0,.1)",
                //color: "rgba(0,0,0,.1)"
            });
        }
    });
    let CryptoChartData = {
        //type: "line",
        labels: labels,
        datasets: datasets,
        /*
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
                        tooltipFormat: 'DD T'
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
        }
        */
    };
    return CryptoChartData;
}

export default createCryptoData;