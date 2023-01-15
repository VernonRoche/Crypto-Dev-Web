import  {CryptohubApi}  from "@/stores/CryptohubApi";
import process from "process";
import {getAuth} from "firebase/auth";
import {count, increment, decrement} from "@/stores/counter"; 
export namespace Favoris {


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

    export async function RemoveFavorite(CryptoName:string){
        const auth = getAuth();
        const user = auth.currentUser!.uid
        if(user ){
            console.log("REMOVE");
            
            decrement();
            CryptohubApi.removeFavorite(user,CryptoName);
        } 
    }

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