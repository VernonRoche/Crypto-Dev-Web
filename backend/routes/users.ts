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
router.get('/getFavorite', async function(req: { query: { user_id: any; }; }, res: any, next: any) {
  try {
    res.send(await DBcommand.getFavorite(req.query.user_id));
  } catch (error) {
    res.status(424).json({"error":error});
  }
});

/* Add Favorite and query are user_id and cryptoname */
router.get('/addFavorite', async function(req: { query: { user_id: any, cryptoName:string }; }, res:any, next: any) {
  try {
    res.send(await DBcommand.addFavorite(req.query.user_id, req.query.cryptoName));
  } catch (error) {
    res.status(424).json({"error":error});
  }
});

/* Remove Favorite and query are user_id and cryptoname */
router.delete('/removeFavorite', async function(req: { query: { user_id: any, cryptoName:string }; }, res: any, next: any) {
  try {
    res.send(await DBcommand.removeFavorite(req.query.user_id, req.query.cryptoName));
  } catch (error) {
    res.status(424).json({"error":error});
  }
});

/* Change Email and query are user_id  and new email */
router.get('/changeEmail',async function(req: { query: { user_id: any, newMail:string }; }, res:any, next: any) {
  try {
    res.send(await DBcommand.changeEmail(req.query.user_id, req.query.newMail));
  } catch (error) {
    res.status(424).json({"error":error});
  }
});

/* Add Notification and query  are user_id cryptoname and targetValue */
router.get('/addNotification', async function(req: { query: { user_id: any, cryptoName:string, targeValue:string | number }; }, res: any, next: any) {
  try {
    res.send(await DBcommand.addNotification(req.query.user_id, req.query.cryptoName, req.query.targeValue));
  } catch (error) {
    res.status(424).json({"error":error});
  }
});

/* get notification and query are user_id and return a notification_object[] */
router.get('/getNotification', async function(req: { query: { user_id: any; }; }, res: any, next: any) {
  try {
    res.send(await DBcommand.getNotification(req.query.user_id));
  } catch (error) {
    res.status(424).json({"error":error});
  }
});

/* Remove Notification and query are user_id cryptoname  */
router.delete('/removeNotification', async function(req: { query: { user_id: any, cryptoName:string }; }, res: any, next: any) {
  try {
    res.send(await DBcommand.removeNotification(req.query.user_id, req.query.cryptoName));
  } catch (error) {
    res.status(424).json({"error":error});
  }
});

/* Reset notification and query is user_id */
router.put('/resetNotification', async function(req: { query: { user_id: any; }; }, res: any, next: any) {
  try {
    res.send(await DBcommand.resetNotification(req.query.user_id));
  } catch (error) {
    res.status(424).json({"error":error});
  }
});

module.exports = router;
