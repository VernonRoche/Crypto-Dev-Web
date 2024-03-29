import axios from "axios";

export namespace CryptohubApi {
  const API: string = "http://localhost:9666/cryptohub/api/";

  /**
   *
   * @param id An user ID
   * @returns Object representing the User
   */
  export async function getUser(id: number | string): Promise<JSON> {
    const URL = API + "getUser";
    return await axios
      .get(URL, { params: { user_id: id } })
      .then((res: any) => res.data);
  }

  /**
   *
   * @param id An user ID
   * @param mail An e-mail address
   * @param favorite An array of favorite cryptocurrencies
   * @param notification An array of notifications
   * @returns status code resulting from the request
   */
  export async function addUser(
    id: number | string,
    mail: string | null,
    favorite: Array<string>,
    notification: Array<string>
  ): Promise<number> {
    const params = {
      user_id: id,
      mail: mail,
      favorite: favorite,
      notification: notification,
    };
    const responce = await axios.post(API + "addUser", null, { params });
    return responce.status;
  }

  /**
   *
   * @param id An user ID
   * @returns status code resulting from the request
   */
  export async function deleteUser(id: number | string): Promise<number> {
    //const URL = API + "deleteUser?user_id="+id;

    const params = {
      user_id: id,
    };
    const responce = await axios.delete(API + "deleteUser", { params });
    return responce.status;
  }

  /**
   *
   * @param id An user ID
   * @param cryptoName the name of a crypto currency
   * @returns status code resulting from the request
   */
  export async function addFavorite(
    id: number | string,
    cryptoName: string
  ): Promise<number> {
    const URL = API + "addFavorite?id=" + id + "&cryptoName=" + cryptoName;
    const params = {
      user_id: id,
      cryptoName: cryptoName,
    };
    return await axios.put(URL, params).then((res: any) => res.status);
  }

  /**
   *
   * @param id An user ID
   * @param cryptoName the name of a crypto currency
   * @returns status code resulting from the request
   */
  export async function removeFavorite(
    id: number | string,
    cryptoName: string
  ): Promise<number> {
    const URL = API + "removeFavorite";
    const params = {
      user_id: id,
      cryptoName: cryptoName,
    };

    const responce = await axios.delete(URL, { params });
    console.log("RESPONCE : ");

    console.log(responce);
    return responce.status;
  }

  /**
   *
   * @param id An user ID
   * @param newMail new value for the e-mail address
   * @returns status code resulting from the request
   */
  export async function changeEmail(
    id: number | string,
    newMail: string
  ): Promise<number> {
    const params = {
      user_id: id,
      newMail: newMail,
    };
    return await axios
      .put(API + "changeEmail", params)
      .then((res: any) => res.status);
  }

  /**
   *
   * @param id An user ID
   * @param cryptoName the name of a crypto currency
   * @param targetValue  value that when it is reached notifications will be sent
   * @returns status code resulting from the request
   */
  export async function addNotification(
    id: number | string,
    cryptoName: string,
    targetValue: string | number
  ): Promise<number> {
    const params = {
      user_id: id,
      crypto_name: cryptoName,
      target_value: targetValue,
    };
    const response = await axios.post(API + "addNotification", null, {
      params,
    });
    return response.status;
  }

  /**
   *
   * @param id An user ID
   * @param cryptoName the name of a crypto currency
   * @returns status code resulting from the request
   */
  export async function removeNotification(
    id: number | string,
    cryptoName: string
  ): Promise<number> {
    const params = {
      user_id: id,
      crypto_name: cryptoName,
    };
    const response = await axios.delete(API + "removeNotification", { params });
    return response.status;
  }

  /**
   *
   * @param id An user ID
   * @returns status code resulting from the request
   */
  export async function resetNotifications(
    id: number | string
  ): Promise<number> {
    const params = {
      user_id: id,
    };
    const response = await axios.put(API + "resetNotifications", params);
    return response.status;
  }

  /**
   *
   * @param id An user ID
   * @returns A String[] containing all the favorites
   */
  export async function getFavorites(id: number | string): Promise<JSON> {
    const URL = API + "getFavorite?" + id;
    return await axios
      .get(URL, { params: { user_id: id } })
      .then((res: any) => res.data);
  }

  /**
   *
   * @param id An user ID
   * @returns A String[] containing all the notifications
   */
  export async function getNotifications(id: number | string): Promise<JSON> {
    const URL = API + "getNotification?id=" + id;
    const responce = await fetch(URL);
    return responce.json();
  }
}
