var express = require('express');
var router = express.Router();
import { DBcommand } from "../DBcommand";

/* Get User by user_id */
router.get('/getUser', async function(req: any, res:any) {
  res.setHeader('Content-Type','application/json');
  try {
    res.send(await DBcommand.getUser(req.query.user_id));
  }catch(error){
    console.error(error);
    await res.status(424).json({error});
  } 
});

/* Add User and paras are user_id and email */
router.post('/addUser', async function(req: any, res:any) {
  try {
    await DBcommand.insertUser(req.query.user_id,req.query.mail,req.query.favorite,req.query.notification);
    console.log(req.query.user_id);
    res.send("OK");
  } catch (error) {
    console.error(error);
    await res.status(424).json({error});
  }
});

/* Delete User by user_id */
router.delete('/deleteUser', async function(req:any, res:any) {
  try {
    await DBcommand.deleteUser(req.query.user_id);
  } catch (error) {
    console.error(error);
    await res.status(424).json({error});
  }
});
/* Get Favorite and query are user_id and return a string[] */
router.get('/getFavorite', async function(req: any, res: any) {
  try {
    res.send(await DBcommand.getFavorite(req.query.user_id));
  } catch (error) {
    console.error(error);
    await res.status(424).json({"error": error});
  }
});

/* Add Favorite and query are user_id and cryptoname */
router.get('/addFavorite', async function(req: any, res:any) {
  try {
    res.send(await DBcommand.addFavorite(req.query.user_id, req.query.cryptoName));
  } catch (error) {
    console.error(error);
    await res.status(424).json({"error": error});
  }
});

/* Remove Favorite and query are user_id and cryptoname */
router.delete('/removeFavorite', async function(req: any, res: any) {
  try {
    res.send(await DBcommand.removeFavorite(req.query.user_id, req.query.cryptoName));
  } catch (error) {
    console.error(error);
    await res.status(424).json({"error": error});
  }
});

/* Change Email and query are user_id  and new email */
router.put('/changeEmail',async function(req:any, res:any) {
  if(req.body.user_id && req.body.newMail) {
    try {
      res.send(await DBcommand.changeEmail(req.body.user_id, req.body.newMail));
    } catch (error) {
      console.error(error);
      await res.status(424).json({"error": error});
    }
  } else {
    await res.status(400).json({"error": "missing parameters"});
  }
});

/* Add Notification and query  are user_id cryptoname and targetValue */
router.get('/addNotification', async function(req: any, res: any) {
  try {
    res.send(await DBcommand.addNotification(req.query.user_id, req.query.cryptoName, req.query.targeValue));
  } catch (error) {
    console.error(error);
    await res.status(424).json({"error": error});
  }
});

/* get notification and query are user_id and return a notification_object[] */
router.get('/getNotification', async function(req: any, res: any) {
  try {
    res.send(await DBcommand.getNotification(req.query.user_id));
  } catch (error) {
    console.error(error);
    await res.status(424).json({"error": error});
  }
});

/* Remove Notification and query are user_id cryptoname  */
router.delete('/removeNotification', async function(req: any, res: any) {
  try {
    res.send(await DBcommand.removeNotification(req.query.user_id, req.query.cryptoName));
  } catch (error) {
    console.error(error);
    await res.status(424).json({"error": error});
  }
});

/* Reset notification and query is user_id */
router.put('/resetNotification', async function(req: any, res: any) {
  try {
    res.send(await DBcommand.resetNotification(req.query.user_id));
  } catch (error) {
    console.error(error);
    await res.status(424).json({"error": error});
  }
});

module.exports = router;
