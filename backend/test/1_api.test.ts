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

            // assert.notEqual(result.user_id, null);
            // assert.notEqual(result.email, null);
            // assert.notEqual(result.favorite, null);
            // assert.notEqual(result.notification, null);
            // assert.notEqual(result._id, undefined);
            // assert.notEqual(result.email, undefined);
            // assert.notEqual(result.favorite, undefined);
            // assert.notEqual(result.notification, undefined);

            assert.equal(result.user_id, "0123456789");
            assert.equal(result.email, "test@crypto.fr");
            assert.deepEqual(result.favorite, ["test"]);
            assert.deepEqual(result.notification, [""]);


        });
    });

   
    // test la fonction deleteUser
    describe('deleteUser', function() {
        it('should delete a user', async function() {
            await DBcommand.deleteUser("0123456789",2) ;
            const user = await DBcommand.getUser("0123456789", 2);
            let result = JSON.parse(JSON.stringify(user));
            assert.equal(result.id, null);
            // assert.equal(result.email, null);
            // assert.deepEqual(result.favorite, null);
            // assert.deepEqual(result.notification, null);
        });
    });

    


});


