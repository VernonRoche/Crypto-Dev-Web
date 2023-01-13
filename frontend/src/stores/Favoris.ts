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
        decrement();
        //CryptohubApi.removeFavorite(user,CryptoName);
    }

}