import { CoinGeckoApi } from "@/stores/CoinGeckoApi";
import "chartjs-adapter-luxon";

/**
 *  Fetch and Clear data for the Chart
 * @param id CoinGecko ID representing a Crypto currency
 * @param currency the name of a crypto currency
 * @param nbDay range of Days
 * @returns Datasets for the Chart
 */
export async function createCryptoData(
  id: string = "bitcoin",
  currency: string = "usd",
  nbDay: number = 1
) {
  const datasets: Array<object> = [];
  const labels: Array<string> = [];
  const data = CoinGeckoApi.getCryptoMarketChart(id, currency, nbDay);
  await data.then((value: Array<string>) => {
    for (const key in value) {
      const datas: Array<number> = [];
      const label: Array<string> = [];
      /*
            key : 
                prices
                market_caps
                total_volumes
            */
      value[key].forEach((element) => {
        datas.push(element[1]);
        label.push(new Date(element[0]));
      });
      labels[key] = label;
      datasets[key] = datas;
    }
  });
  return [datasets, labels];
}

export default createCryptoData;
