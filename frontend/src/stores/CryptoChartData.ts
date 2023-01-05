import { CoinGeckoApi }  from "../stores/CoinGeckoApi"
import 'chartjs-adapter-luxon';

export async function createCryptoData(id:string="bitcoin",currency:string="usd",from:any=null/*new Date().setHours(0,0,0,0).valueOf()*/,to:any=null) {
    let datasets:Array<object>  = [];
    let labels:Array<string> = [];
    let data = null;
    if(from == null || to ==null ){
        data  =  CoinGeckoApi.getCryptoMarketChartRange(id,currency,1392577232,Date.now());
    }else{
         data  =  CoinGeckoApi.getCryptoMarketChartRange(id,currency,from,to);
    } 
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
    /*
    labels.sort((a:Date,b:Date) =>{
        return a.getTime() - b.getTime();
    });
    */
    return [datasets,labels];
}

export default createCryptoData;