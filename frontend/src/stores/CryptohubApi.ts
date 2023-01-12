import axios from "axios";

export namespace CryptohubApi {
    const API:string = "http://localhost:9666/cryptohub/api/";

    /**
     * 
     * @param id An user ID
     * @returns Object representing the User
     */
   export async function getUser(id:number|string):Promise<JSON>{
    const URL = API + "getUser?user_id="+id;
    const responce = await fetch(URL);
    return responce.json();
   }

    
   /**
    * 
    * @param id An user ID
    * @param mail An e-mail address
    * @returns status code resulting from the request
    */
   export async function addUser(id:number|string, mail:string|null, favorite:Array<string>, notification:Array<string>):Promise<number>{
    //const URL = API + "addUser?user_id="+id+"&mail="+mail+"&favorite="+favorite+"&notification="+notification;
    const params  = {
      user_id : id,
      mail : mail,
      favorite : favorite,
      notification : notification
    }
    const responce = await axios.post(API + "addUser" , null ,{params});
    return responce.status;
   }

   /**
    * 
    * @param id An user ID
    * @returns status code resulting from the request
    */
   export async function deleteUser(id:number|string):Promise<number>{
    const URL = API + "deleteUser?user_id="+id;
    const responce = await fetch(URL);
    return responce.status;
   }

   /**
    * 
    * @param id An user ID
    * @param cryptoName the name of a crypto currency
    * @returns status code resulting from the request
    */
   export async function addFavorite(id:number|string, cryptoName:string):Promise<number>{
    const URL = API + "addFavorite?id="+id+"&cryptoName="+cryptoName;
    const responce = await fetch(URL);
    return responce.status;
   }

   /**
    * 
    * @param id An user ID
    * @param cryptoName the name of a crypto currency
    * @returns status code resulting from the request
    */
   export async function removeFavorite(id:number|string, cryptoName:string):Promise<number>{
    const URL = API + "removeFavorite?"+id+"&cryptoName="+cryptoName;
    const responce = await fetch(URL);
    return responce.status;
   }

   /**
    * 
    * @param id An user ID
    * @param newMail new value for the e-mail address
    * @returns status code resulting from the request
    */
   export async function changeEmail(id:number|string, newMail:string):Promise<number>{
    const URL = API + "changeEmail?id="+id+"&newMail="+newMail;
    const responce = await fetch(URL);
    return responce.status;
   }

   /**
    * 
    * @param id An user ID
    * @param cryptoName the name of a crypto currency
    * @param targetValue  value that when it is reached notifications will be sent
    * @returns status code resulting from the request
    */
   export async function addNotification(id:number|string, cryptoName:string, targetValue:string | number ):Promise<number>{
    const URL = API + "addNotification?id="+id+"&cryptoName="+cryptoName+"&targeValue="+targetValue;
    const responce = await fetch(URL);
    return responce.status;
   }

   /**
    * 
    * @param id An user ID
    * @param cryptoName the name of a crypto currency
    * @returns status code resulting from the request
    */
   export async function removeNotification(id:number|string, cryptoName:string):Promise<number>{
    const URL = API + "removeNotification?id="+id+"&cryptoName="+cryptoName;
    const responce = await fetch(URL);
    return responce.status;
   }
   
   /**
    * 
    * @param id An user ID
    * @returns status code resulting from the request
    */
   export async function resetNotifications(id:number|string):Promise<number>{
    const URL = API + "resetNotification?id="+id;
    const responce = await fetch(URL);
    return responce.status;
   }

   /**
    * 
    * @param id An user ID
    * @returns A String[] containing all the favorites 
    */
   export async function getFavorites(id:number|string):Promise<JSON>{
    const URL = API + "getFavorite?id="+id;
    const responce = await fetch(URL);
    return responce.json();
   }

   /**
    * 
    * @param id An user ID
    * @returns A String[] containing all the notifications 
    */
   export async function getNotifications(id:number|string):Promise<JSON>{
    const URL = API + "getNotification?id="+id;
    const responce = await fetch(URL);
    return responce.json();
   }
}

