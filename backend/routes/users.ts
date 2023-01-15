var express = require("express");
var router = express.Router();
import { DBcommand } from "../DBcommand";

/**
 * @openapi
 * /getUser:
 *   get:
 *     description: Get user by user_id
 *     responses:
 *       '200':
 *         description: Returns user
 */
router.get("/getUser", async function (req: any, res: any) {
  res.setHeader("Content-Type", "application/json");
  try {
    res.send(await DBcommand.getUser(req.query.user_id));
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error });
  }
});



/**
 * @openapi
 * /addUser:
 *   post:
 *     description: Add user by user_id , mail ,  3 favorites and notification
 *     responses:
 *       '200':
 *         description: Returns new user
 */
router.post("/addUser", async function (req: any, res: any) {
  try {
    await DBcommand.insertUser(
      req.query.user_id,
      req.query.mail,
      req.query.favorite,
      req.query.notification
    );
    res.send("OK");
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error });
  }
});

/**
 * @openapi
 * /deleteUser:
 *   delete:
 *     description: Delete user by user_id
 *     responses:
 *       '200':
 *         description: deleted successfully by user_id 
 */
router.delete("/deleteUser", async function (req: any, res: any) {
  try {
    await DBcommand.deleteUser(req.query.user_id);
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error });
  }
});

/**
 * @openapi
 * /getFavorite:
 *    get:
 *      description: Get favorite by user_id
 *      responses:
 *        '200':
 *          description: Returns favorite by user_id 
 *        
 */
router.get("/getFavorite", async function (req: any, res: any) {
  try {
    res.send(await DBcommand.getFavorite(req.query.user_id));
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

/**
 * @openapi
 * /addFavorite:
 *  put:
 *   description: Add favorite by user_id and cryptoname
 *  responses:
 *   '200':
 *   description: Returns favorite by user_id and cryptoname
 */
router.put("/addFavorite", async function (req: any, res: any) {
  try {
    res.send(
      await DBcommand.addFavorite(req.body.user_id, req.body.cryptoName)
    );
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

/**
 * @openapi
 * /removeFavorite:
 *  delete:
 *   description: Remove favorite by user_id and cryptoname
 *  responses:
 *   '200':
 *   description: Returns favorite by user_id and cryptoname after remove it
 */
router.delete("/removeFavorite", async function (req: any, res: any) {
  try {
    await DBcommand.removeFavorite(req.query.user_id, req.query.cryptoName);
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

/**
 * @openapi
 * /changeEmail:
 *  put:
 *   description: Change email by user_id and newMail
 *  responses:
 *   '200':
 *   description: Returns email by user_id and newMail after change it
 */
router.put("/changeEmail", async function (req: any, res: any) {
  if (req.body.user_id && req.body.newMail) {
    try {
      res.send(await DBcommand.changeEmail(req.body.user_id, req.body.newMail));
    } catch (error) {
      console.error(error);
      await res.status(424).json({ error: error });
    }
  } else {
    await res.status(400).json({ error: "missing parameters" });
  }
});

/* Add Notification and query  are user_id cryptoname and targetValue */
router.post("/addNotification", async function (req: any, res: any) {
  try {
    res.send(
      await DBcommand.addNotification(
        req.query.user_id,
        req.query.crypto_name,
        req.query.target_value
      )
    );
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

/* get notification and query are user_id and return a notification_object[] */
router.get("/getNotification", async function (req: any, res: any) {
  try {
    res.send(await DBcommand.getNotification(req.query.user_id));
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

/* Remove Notification and query are user_id cryptoname  */
router.delete("/removeNotification", async function (req: any, res: any) {
  try {
    res.send(
      await DBcommand.removeNotification(
        req.query.user_id,
        req.query.cryptoName
      )
    );
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

/* Reset notification and body is user_id */
router.put("/resetNotification", async function (req: any, res: any) {
  try {
    res.send(await DBcommand.resetNotification(req.body.user_id));
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

module.exports = router;
