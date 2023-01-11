let CryptoData = null;
/*
const URLPing = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
const responce = await fetch(URLPing);
console.log(responce);

*/
function getPrice(id: string, vs_curencies: string, market_cap: boolean ): string{
    return "";
  } 
  
  
  async function getTrend(): Promise<void>{
    const URL = "https://api.coingecko.com/api/v3/search/trending";
    const responce = await fetch(URL).then(onSuccess,onError);
    console.log(responce);
  } 
  
  async function getGlobal(): Promise<void>{
    const URL = "https://api.coingecko.com/api/v3/search/trending";
    const responce = await fetch(URL).then(onSuccess,onError);
    console.log(responce);
  }
  
  async function getGlobalDEFI(): Promise<void>{
    const URL = "https://api.coingecko.com/api/v3/global/decentralized_finance_defi";
    const responce = await fetch(URL).then(onSuccess,onError);
    console.log(responce);
  }
  
  async function onSuccess(responce:any) {
    CryptoData = await responce.json();
    console.log(CryptoData)
  }
  
  async function onError(e: string) {
    console.error(e)
  }
  getGlobalDEFI()
  export { CryptoData, getPrice };