import * as assert from 'assert';
import { DBcommand } from '../DBcommand';
const { MongoClient, ServerApiVersion } = require('mongodb');


const COLLNAME = "UserPreferences";
const DBNAME = "test";

// test le fichier DBcommand.ts
describe('DBcommand', function() {

    const User ={
        user_id: "0123456789",
        email: "test1@crypto.fr",
        favorite: ["test"],
        notification: [""],
    }

    const User2 ={
        user_id: "01234",
        email: "test2@crypto.fr",
        favorite: [],
        notification: [""],
    }

    const User3 ={
        user_id: "012345",
        email: "test3@crypto.fr",
        favorite: ["test3"],
        notification: ["test3"],
    }
    
    // test la fonction insertUser
    describe('User', function() {
        it('should insert a user', async function() {
            const userExist = await DBcommand.getUser(User.user_id, 2);
            if(userExist === null){
                await DBcommand.insertUser(User.user_id, User.email, User.favorite, User.notification,2);
                const user = await DBcommand.getUser("0123456789",2);
                let result = JSON.parse(JSON.stringify(user));
                if(result !== null) {
                    assert.notEqual(result.user_id, null);
                    assert.notEqual(result.email, null);
                    assert.notEqual(result.favorite, null);
                    assert.notEqual(result.notification, null);
                    assert.notEqual(result._id, undefined);
                    assert.equal(result.user_id, User.user_id);
                    assert.equal(result.email, User.email);
                    assert.deepEqual(result.favorite, User.favorite);
                    assert.deepEqual(result.notification, User.notification);
                } else {
                    assert.equal(result, null);
                }
            }
        });
        

    
        it('should delete a user', async function() {
            await DBcommand.deleteUser(User.user_id,2) ;
            const user = await DBcommand.getUser(User.user_id, 2);
            let result = JSON.parse(JSON.stringify(user));
            assert.equal(result, null);
    });

    describe('Favorite', function() {
        it('should add and get  favorite', async function() {
            await DBcommand.insertUser(User2.user_id, User2.email,User2.favorite,User2.notification,2);
            await DBcommand.addFavorite(User2.user_id, 'crypto',2);
            const user = await  DBcommand.getFavorite(User2.user_id,2);
            let result = JSON.parse(JSON.stringify(user));
            assert.deepEqual(result[0].favorite[0], 'crypto');
          });


        it('should remove a favorite', async function() {
            await DBcommand.removeFavorite(User2.user_id, 'crypto',2);
            const user = await DBcommand.getFavorite(User2.user_id,2);
            let result = JSON.parse(JSON.stringify(user));
            assert.deepEqual(result[0].favorite[1], undefined);
        });

    });


    describe('Notification', function() {
        it('change email', async function() {
            await DBcommand.insertUser(User3.user_id, User3.email,User3.favorite,User3.notification,2);
            await DBcommand.changeEmail(User3.user_id, "",2);
            const user = DBcommand.getUser(User3.user_id,2);
            let result = JSON.parse(JSON.stringify(user));
            assert.notEqual(result.email, "test3@crypto.fr");
            assert.equal(result.email, undefined);

        });


        it('add and get  notification', async function() {
            await DBcommand.addNotification(User3.user_id, "test",100,2);
            const user = DBcommand.getNotification(User3.user_id,2);
            let result = JSON.parse(JSON.stringify(user));
            assert.deepEqual(result[0].notification, [{name: "crypto", targetValue: 100}]);

        });


        it('should remove a notification', async function() {
            await DBcommand.addFavorite(User3.user_id, "test3",2);
            await DBcommand.removeNotification(User3.user_id, "test3",2);
            const user = DBcommand.getNotification("01234",2);
            let result = JSON.parse(JSON.stringify(user));
            assert.deepEqual(result.notification, undefined);


        });



        it('should resetNotification a notification', async function() {
            await DBcommand.resetNotification("01234",2);
            const user = DBcommand.getNotification("01234",2);
            let result = JSON.parse(JSON.stringify(user));
            console.log(result);
            assert.deepEqual(result.notification, undefined);


        });

    });



    
});

});
