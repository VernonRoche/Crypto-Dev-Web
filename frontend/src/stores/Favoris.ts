import  {CryptohubApi}  from "@/stores/CryptohubApi";
import process from "process";
import {getAuth} from "firebase/auth";
import {count, increment, decrement} from "@/stores/counter"; 
export namespace Favoris {

    /**
    *  Add a Crypto currencies to Favorite
    * @param CryptoName Name of a Crypto Currency
    * @returns true if Favoris as been added false otherwise
    */
    export async function addFavoris(CryptoName:string) {
        const auth = getAuth();
        const user = auth.currentUser!.uid;
        
        if(user && (count.value < 3) ){               
            increment();            
            let status = await CryptohubApi.addFavorite(user,CryptoName);
            return true;
        }
        return false;
    }
    /**
    *  Remove a Crypto currencies to Favorite
    * @param CryptoName Name of a Crypto Currency
    * @returns true if Favoris as been removed false otherwise
    */
    export async function RemoveFavorite(CryptoName:string){
        const auth = getAuth();
        const user = auth.currentUser!.uid
        if(user ){            
            decrement();
            CryptohubApi.removeFavorite(user,CryptoName);
        } 
    }
    /**
    *  Create a Div that represent a Crypto currencies
    * @param name Name of a Crypto Currency
    * @returns Div for the Crypto currency
    */
    export function createFavIcon(name:string){
        let favIcon: HTMLImageElement = document.createElement("img");
        favIcon.setAttribute("class", "FavIcon inline cursor-pointer");
        favIcon.setAttribute("width", "20");
        favIcon.setAttribute("height", "20");
        favIcon.setAttribute("min-width", "20");
        favIcon.setAttribute("min-height", "20");
        favIcon.setAttribute("alt", "Fav");
        favIcon.src ="https://cdn.discordapp.com/attachments/1042336221948551168/1058041919407673374/starFull.png";
        favIcon.addEventListener('click', async () =>{
          
          await RemoveFavorite(name);
          document.getElementById("FavIcon - "+name)!.innerHTML = "";
        })
        return favIcon;
}

}