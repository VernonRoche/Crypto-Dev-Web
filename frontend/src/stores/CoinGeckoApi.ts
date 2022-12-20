export namespace CoinGeckoApi {
  /**
   * Check API server status
   * @returns Promise responce from the fetch
   */
  export async function getPing(): Promise<JSON> {
    const URL = "https://api.coingecko.com/api/v3/ping";
    const responce = await fetch(URL);
    return await responce.json();
  }

  /**
   * Get the top 7 trending serched coin on CoinGecko in the last 24 hours
   * @returns Promise responce from the fetch
   */
  export async function getTrend(): Promise<string> {
    const URL = "https://api.coingecko.com/api/v3/search/trending";
    const responce = await fetch(URL);
    return await responce.json();
  }

  /**
    * 
    * @returns 
    
    export async function getGlobal(): Promise<JSON>{
        const URL = "https://api.coingecko.com/api/v3/search/trending";
        const responce = await fetch(URL);
        return await responce.json();
    }

    /**
     * 
     * @returns 
     
    export async function getGlobalDEFI(): Promise<JSON>{
        const URL = "https://api.coingecko.com/api/v3/global/decentralized_finance_defi";
        const responce = await fetch(URL);
        return await responce.json();
    }
    */

  /**
   * get the list of all supported coin id,name and symbol
   * @returns Promise responce from the fetch
   */
  export async function getCryptoList(): Promise<JSON> {
    const URL = "https://api.coingecko.com/api/v3/coins/list";
    const responce = await fetch(URL);
    return await responce.json();
  }

  /**
   * get the list of all supported coin price, market cap, volume and market related data
   * @param currency the target currency of market data (eur,usd,jpy,...)
   * @returns Promise responce from the fetch
   */
  export async function getCryptoMarket(currency: string): Promise<JSON> {
    const URL =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
      currency +
      "&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const responce = await fetch(URL);
    return await responce.json();
  }

  /**
   * get the current price of any cryptocurrencies
   * @param id id of the coins, comma-sepparated if querying more then 1 currency
   * @param currency the target currency of market data (eur,usd,jpy,...), comma-sepparated if querying more then 1 currency
   * @param market_cap true to include market cap default:false
   * @param hour_vol true to include 24 hours volume  default:false
   * @param hour_change true to include 24 hours change default:false
   * @param last_update true to include last update price default:false
   * @param precision value between 0-18 to specify the decimal for currency price value
   * @returns  Promise responce from the fetch
   */
  export async function getCryptoPrice(
    id: string,
    currency: string = "eur",
    market_cap: boolean = false,
    hour_vol: boolean = false,
    hour_change: boolean = false,
    last_update: boolean = false,
    precision: number = 3
  ): Promise<JSON> {
    const URL =
      "https://api.coingecko.com/api/v3/simple/price?ids=" +
      id +
      "&vs_currencies=" +
      currency +
      "&include_market_cap=" +
      market_cap +
      "&include_24hr_vol=" +
      hour_vol +
      "&include_24hr_change=" +
      hour_change +
      "&include_last_updated_at=" +
      last_update +
      "&precision=" +
      precision;
    const responce = await fetch(URL);
    return await responce.json();
  }

  /**
   * get the list of supported vs_currency (euro,dollar,...)
   * @returns Promise responce from the fetch
   */
  export async function getSupportedCurrency(): Promise<Array<string>> {
    const URL =
      "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
    const responce = await fetch(URL);
    return await responce.json();
  }

  /**
   * Search for coins,categories and markets on CoinGecko.
   * @param query Search string
   * @returns Promise responce from the fetch
   */
  export async function Search(query: string = ""): Promise<string> {
    const URL = "https://api.coingecko.com/api/v3/search?query=" + query;
    const responce = await fetch(URL);
    return await responce.json();
  }
}
