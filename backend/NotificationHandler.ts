import {DBcommand} from "./DBcommand";


/**
 * get the list of all supported coin price, market cap, volume and market related data
 * @param currency the target currency of market data (eur,usd,jpy,...)
 * @returns Promise responce from the fetch
 */
async function fetchCryptoData(currency: string="usd"): Promise<Array<string>> {
        const URL =
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
            currency +
            "&order=market_cap_desc&per_page=100&page=1&sparkline=false";
        const response = await fetch(URL);
        return await response.json();
}

function getCoinPrices(): Array<{ name: string, price: number }> {
    let prices: { name: string, price: number }[] = [];
    fetchCryptoData().then((value: Array<string>) => {
        value.forEach((element: any) => {
            prices.push({ name: element.name, price: element.current_price });
        });
    });
    return prices;
}

function getUsersToBeNotified(): Array<{ user_id: string, notifiedCryptos: Array<string> }> {
    let users: { user_id: string, notifiedCryptos: Array<string> }[] = [];
    const currentPrices = getCoinPrices();
    DBcommand.getAllUsers().then((value: any) => {
        const valueData=JSON.parse(JSON.stringify(value));
        let cryptosList: Array<string> = [];
        valueData.notification.forEach((element: any) => {
            if (currentPrices.find((crypto: any) => crypto.name === element)) {
                cryptosList.push(element);
            }
        });
        users.push({ user_id: valueData.user_id, notifiedCryptos: cryptosList });
    });
    return users;
}