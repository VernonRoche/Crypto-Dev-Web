import { expect, test } from "vitest";
import { assert } from "chai";
import { CryptohubApi}  from "@/stores/CryptohubApi.ts";

    const user = {
        
    } 
    /*
/cryptohub/api/getUser	user_id	user_object (see DB diagram)
/cryptohub/api/addUser	user_id, email	status code
/cryptohub/api/deleteUser	user_id	status code
/cryptohub/api/addFavorite	user_id,crypto_name	status code
/cryptohub/api/removeFavorite	user_id,crypto_name	status code
/cryptohub/api/changeEmail	user_id,new_email	status code
/cryptohub/api/addNotification	user_id,crypto_name,target_value	status code
/cryptohub/api/removeNotification	user_id,crypto_name	status code
/cryptohub/api/resetNotifications	user_id	status code
/cryptohub/api/getFavorites	user_id	String[]
/cryptohub/api/getNotifications	user_id	notification_object[]
    
    */

test("test : getUser", function(){

});

test("test : addUser", function(){
    
});

test("test : deleteUser", function(){
    
});

test("test : addFavorite", function(){
    
});

test("test : removeFavorite", function(){
    
});

test("test : changeEmail", function(){
    
});

test("test : addNotification", function(){
    
});

test("test : removeNotification", function(){
    
});

test("test : resetNotifications", function(){
    
});

test("test : getFavorites", function(){
    
});

test("test : getNotifications", function(){
    
});