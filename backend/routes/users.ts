var express = require('express');
var router = express.Router();
import { DBcommand } from "../DBcommand";

/* Get User by user_id */
router.get('/getUser', async function(req: { query: { user_id: any; }; }, res:any, next: any) {
  res.setHeader('Content-Type','application/json');
  try {
    res.send(await DBcommand.getUser(req.query.user_id));
  }catch(error){
    res.status(424).json({error});
  } 
});

/* Add User and paras are user_id and email */
router.get('/addUser', async function(req: { query: { user_id: any, mail:string, favorite:Array<string>, notification:Array<string> };  }, res:any , next: any) {
  try {
    await DBcommand.insertUser(req.query.user_id,req.query.mail,req.query.favorite,req.query.notification);
    res.send("OK");
  } catch (error) {
    res.status(424).json({error});
  }
});

/* Delete User by user_id */
router.delete('/deleteUser', async function(req: { query: { user_id: any; }; }, res:any, next: any) {
  try {
    await DBcommand.deleteUser(req.query.user_id);
  } catch (error) {
    res.status(424).json({error});
  }
});
/* Get Favorite and query are user_id and return a string[] */
router.get('/getFavorite', function(req: { query: { user_id: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Add Favorite and query are user_id and cryptoname */
router.get('/addFavorite', function(req: { query: { user_id: any, cryptoName:string }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Remove Favorite and query are user_id and cryptoname */
router.delete('/removeFavorite', function(req: { query: { user_id: any, cryptoName:string }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Change Email and query are user_id  and new email */
router.get('/changeEmail', function(req: { query: { user_id: any, newMail:string }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Add Notification and query  are user_id cryptoname and targetValue */
router.get('/addNotification', function(req: { query: { user_id: any, cryptoName:string, targeValue:string | number }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* get notification and query are user_id and return a notification_object[] */
router.get('/getNotification', function(req: { query: { user_id: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Remove Notification and query are user_id cryptoname  */
router.delete('/removeNotification', function(req: { query: { user_id: any, cryptoName:string }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Reset notification and query is user_id */
router.put('/resetNotification', function(req: { query: { user_id: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});



module.exports = router;
