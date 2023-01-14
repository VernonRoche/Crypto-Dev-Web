import * as assert from 'assert';
import { DBcommand } from '../DBcommand';
const { MongoClient, ServerApiVersion } = require('mongodb');


const COLLNAME = "UserPreferences";
const DBNAME = "test";

// test le fichier DBcommand.ts
describe('DBcommand', function() {
    
    // test la fonction insertUser
    describe('insertUser', function() {
        it('should insert a user', async function() {
            await DBcommand.insertUser(2, "test@crypto.fr",["test"],[""]);
            const user = await DBcommand.getUser("0123456789");
            assert.equal(user, "0123456789");
        });
    });

    // test la fonction getUser
    describe('getUser', function() {
      it('should return a user', async function() {
          const user =await  DBcommand.getUser("0123456");
          console.log("user = "  + user);
          //assert.equal(user.user_id, "0123456");
      });
  });

    // test la fonction deleteUser
    describe('deleteUser', function() {
        it('should delete a user', async function() {
            await DBcommand.deleteUser("0123456") ;
            const user = await DBcommand.getUser("0123456");
            assert.equal(user, null);
        });
    });
});


