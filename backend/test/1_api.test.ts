import * as assert from 'assert';
import { DBcommand } from '../DBcommand';
const { MongoClient, ServerApiVersion } = require('mongodb');


const COLLNAME = "UserPreferences";
const DBNAME = "test";

// test le fichier DBcommand.ts
describe('DBcommand', function() {
    
    // test la fonction insertUser
    describe('insertUser et getUser', function() {
        it('should insert a user', async function() {
            await DBcommand.insertUser("0123456789", "test@crypto.fr",["test"],[""],2);
            const user = await DBcommand.getUser("0123456789",2);
            let result = JSON.parse(JSON.stringify(user));

             assert.notEqual(result.user_id, null);
             assert.notEqual(result.email, null);
             assert.notEqual(result.favorite, null);
             assert.notEqual(result.notification, null);
             assert.notEqual(result._id, undefined);
             assert.notEqual(result.email, undefined);
             assert.notEqual(result.favorite, undefined);
             assert.notEqual(result.notification, undefined);

            assert.equal(result.user_id, "0123456789");
            assert.equal(result.email, "test@crypto.fr");
            assert.deepEqual(result.favorite, ["test"]);
            assert.deepEqual(result.notification, [""]);


        });

        it('should delete a user', async function() {
            await DBcommand.deleteUser("0123456789",2) ;
            const user = await DBcommand.getUser("0123456789", 2);
            let result = JSON.parse(JSON.stringify(user));
            assert.equal(result.id, null);
            // assert.equal(result.email, null);
            // assert.deepEqual(result.favorite, null);
            // assert.deepEqual(result.notification, null);
        });

        it('should add and get  favorite', async function() {
            await DBcommand.insertUser("01234", "test2@crypto.fr",[""],[""],2);
            await DBcommand.addFavorite("01234", "crypto",2);
            const user = DBcommand.getFavorite("01234",2);
            let result = JSON.parse(JSON.stringify(user));
            assert.deepEqual(result.favorite, ["crypto"]);
          });


        it('should remove a favorite', async function() {
            await DBcommand.removeFavorite("01234", "test",2);
            const user = DBcommand.getFavorite("01234",2);
            let result = JSON.parse(JSON.stringify(user));
            assert.deepEqual(result.favorite, []);
        });


        it('change email', async function() {
            await DBcommand.changeEmail("01234", "toto@test.com",2);
            const user = DBcommand.getUser("01234",2);
            let result = JSON.parse(JSON.stringify(user));
            assert.notEqual(result.email, "test2@crypto.fr");
            assert.equal(result.email, "toto@test.com");

        });


        it('add and get  notification', async function() {
            await DBcommand.addNotification("01234", "test",200,2);
            const user = DBcommand.getNotification("01234",2);
            let result = JSON.parse(JSON.stringify(user));
            assert.deepEqual(result.notification, ["200"]);

        });


        it('remove a notification', async function() {
            await DBcommand.removeNotification("01234", "test",2);
            const user = DBcommand.getNotification("01234",2);
            let result = JSON.parse(JSON.stringify(user));
            assert.deepEqual(result.notification, []);


        });



        it('should resetNotification a notification', async function() {
            await DBcommand.resetNotification("01234",2);
            const user = DBcommand.getNotification("01234",2);
            let result = JSON.parse(JSON.stringify(user));
            assert.deepEqual(result.notification, []);


        });



    });
});


