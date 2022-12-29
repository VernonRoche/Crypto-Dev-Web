import { CoinGeckoApi }  from "../stores/CoinGeckoApi"
import 'chartjs-adapter-luxon';

export async function createCryptoData(id:string="bitcoin",currency:string="usd",from:number=1392577232/*new Date().setHours(0,0,0,0).valueOf()*/,to:number=Date.now()) {
    let datasets:Array<object>  = [];
    let labels:Array<string> = [];
    const data  =  CoinGeckoApi.getCryptoMarketChartRange(id,currency,from,to);
    await data.then( (value:Array<string>) => {
        for(const key in value){
            let datas:Array<number> = [];
            let label:Array<string> = [];
            /*
            key : 
                prices

                market_caps
                total_volumes
            */
            value[key].forEach(element => {
                datas.push(element[1]);
                label.push(new Date(element[0]));
            });
            labels[key] = label; 
            datasets[key] = datas 
        }
    });
    labels.sort((a:Date,b:Date) =>{
        return a.getTime() - b.getTime();
    });
    return [datasets,labels];
}

export default createCryptoData;