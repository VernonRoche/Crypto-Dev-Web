var express = require("express");
var router = express.Router();
import { DBcommand } from "../DBcommand";

/**
 * @openapi
 * /getUser:
 *  get:
 *    description: Retrieve a User from the Database
 *    parameters:
 *      - name: user_id
 *        in: query
 *        schema:
 *          type: string
 *        example: FgstGsdUOmV6MOUsV7yL9Vbvs5g1
 *        required: true
 *    responses:
 *      '200':
 *        description: All the information about the asked user
 *        content:
 *          application/json; charset=utf-8:
 *            schema:
 *              type: string
 *            examples: {}
 *    tags:
 *      - User         
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
 *     description:  Add a new User to dataBase
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notification:
 *                 type: array
 *                 items:
 *                   type: string
 *               mail:
 *                 type: string
 *               user_id:
 *                 type: string
 *               favorite:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     coin_id:
 *                       type: string
 *                     name:
 *                       type: string
 *           examples:
 *             '0':
 *               value: |-
 *                 {
 *                   "user_id": "FgstGsdUOmV6MOUsV7yL9Vbvs5g1",
 *                   "mail": "mai@mail.fr",
 *                   "favorite": [{"name":"Bitcoin",  "coin_id":"bitcoin"   }, {"name":"Ethereum",  "coin_id":"ethereum"   }, {"name":"Litecoin",  "coin_id":"litecoin" } ],
 *                   "notification": [""]
 *                 }
 *     responses:
 *       '200':
 *         description: User Successfully Added
 *         content:
 *           text/html; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 *     tags:
 *       - User   
 */
router.post("/addUser", async function (req: any, res: any) {
  try {    
    await DBcommand.insertUser(
      req.body.user_id,
      req.body.mail,
      req.body.favorite,
      req.body.notification
    );
    res.send("User Successfully Added");
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error });
  }
});

/**
 * @openapi
 * /deleteUser:
 *  delete:
 *    description: Delete a User from the Database
 *    parameters:
 *      - name: user_id
 *        in: query
 *        schema:
 *          type: string
 *        example: FgstGsdUOmV6MOUsV7yL9Vbvs5g1
 *        required: true
 *    responses:
 *      '200':
 *        description: User Successfully Deleted
 *    tags:
 *      - User     
 */
router.delete("/deleteUser", async function (req: any, res: any) {
  try {    
    await DBcommand.deleteUser(req.query.user_id);
    res.send("User Successfully Deleted");
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error });
  }
});

/**
 * @openapi
 * /getFavorite:
 *   get:
 *     description: Retrieve the favorites of a specific user
 *     parameters:
 *       - name: user_id
 *         in: query
 *         schema:
 *           type: string
 *         example: n1PHL52yJHeBRx08AgkQB1ePsWI2
 *         required: true
 *     responses:
 *       '200':
 *         description: List of favorites of the user
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 *     tags:
 *       - Favorites    
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
 *   put:
 *     description: Add a new favorite for a specific user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               favorite:
 *                 type: object
 *                 properties:
 *                   coin_id:
 *                     type: string
 *                   name:
 *                     type: string
 *           examples:
 *             '0':
 *               value: |-
 *                 {
 *                   "user_id": "FgstGsdUOmV6MOUsV7yL9Vbvs5g1",
 *                   "favorite": {  "name": "Bitcoin",  "coin_id": "bitcoin" }
 *                 }
 *     responses:
 *       '200':
 *         description: Favorite Successfully Added
 *         content:
 *           text/html; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 *     tags:
 *       - Favorites  
*/
router.put("/addFavorite", async function (req: any, res: any) {
  try {
    await DBcommand.addFavorite(req.body.user_id, req.body.cryptoName);
    res.send("Favorite Successfully Added");
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

/**
 * @openapi
 * /removeFavorite:
 *  delete:
 *     description: Delete a favorite from a specific user
 *     parameters:
 *       - name: user_id
 *         in: query
 *         schema:
 *          type: string
 *         example: FgstGsdUOmV6MOUsV7yL9Vbvs5g1
 *         required: true
 *       - name: cryptoName
 *         in: query
 *         schema:
 *          type: object
 *          properties:
 *            coin_id:
 *              type: string
 *            name:
 *              type: string
 *         example:
 *           {  "name": "Bitcoin",  "coin_id": "bitcoin" }
 *         required: true 
 *     responses:
 *       '200':
 *         description: Favorite Successfully Deleted
 *         content:
 *           text/html; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 *     tags:
 *       - Favorites  
 */
router.delete("/removeFavorite", async function (req: any, res: any) {
  try {
    await DBcommand.removeFavorite(req.query.user_id, req.query.cryptoName);
    res.send("Favorite Successfully Deleted");
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});


/**
 * @openapi
 * /changeEmail:
 *  put:
 *     description: Replace the current mail address for a specific user by a new one
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               newMail:
 *                 type: string
 *           examples:
 *             '0':
 *               value: |-
 *                 {
 *                   "user_id": "FgstGsdUOmV6MOUsV7yL9Vbvs5g1",
 *                   "newMail": "mail@test.com"
 *                 }
 *     responses:
 *       '200':
 *         description: Mail Successfully Changed
 *         content:
 *           text/html; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 *     tags:
 *       - Mail  
 */
router.put("/changeEmail", async function (req: any, res: any) {
  if (req.body.user_id && req.body.newMail) {
    try {
      await DBcommand.changeEmail(req.body.user_id, req.body.newMail);
      res.send("Mail Successfully Changed");
    } catch (error) {
      console.error(error);
      await res.status(424).json({ error: error });
    }
  } else {
    await res.status(400).json({ error: "missing parameters" });
  }
});

/**
 * @openapi
 * /addNotification:
 *   post:
 *     description: Add a new notification for a specific user 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               cryptoName:
 *                 type: string
 *               targeValue:
 *                 type: integer
 *           examples:
 *             '0':
 *               value: |-
 *                 {
 *                   "user_id": "FgstGsdUOmV6MOUsV7yL9Vbvs5g1",
 *                   "cryptoName": "Bitcoin",
 *                   "targeValue":20519
 *                 }
 *     responses:
 *       '200':
 *         description: Notification Successfully Added
 *         content:
 *           text/html; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 *     tags:
 *       - Favorites  
*/
router.post("/addNotification", async function (req: any, res: any) {
  try {
    await DBcommand.addNotification(
      req.query.user_id,
      req.query.cryptoName,
      req.query.targeValue
    );
    res.send("Notification Successfully Added");
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

/**
 * @openapi
 * /getNotification:
 *   get:
 *    description: Retrieve all Notifications for a specific user
 *    parameters:
 *      - name: user_id
 *        in: query
 *        schema:
 *          type: string
 *        example: FgstGsdUOmV6MOUsV7yL9Vbvs5g1
 *        required: true
 *    responses:
 *      '200':
 *        description: List of notifications of the user
 *        content:
 *          application/json; charset=utf-8:
 *            schema:
 *              type: string
 *            examples: {}
 *    tags:
 *      - Notifications  
 */
router.get("/getNotification", async function (req: any, res: any) {
  try {
    res.send(await DBcommand.getNotification(req.query.user_id));
  } catch (error) {
    await res.status(424).json({ error: error });
  }
});

/**
 * @openapi
 * /removeNotification:
 *  delete:
 *     description: Delete a notification for a specific user
 *     parameters:
 *       - name: user_id
 *         in: query
 *         schema:
 *          type: string
 *         example: FgstGsdUOmV6MOUsV7yL9Vbvs5g1
 *         required: true
 *       - name: cryptoName
 *         in: query
 *         schema:
 *          type: object
 *          properties:
 *            coin_id:
 *              type: string
 *            name:
 *              type: string
 *         example:
 *           {  "name": "Bitcoin",  "coin_id": "bitcoin" }
 *         required: true        
 *     responses:
 *       '200':
 *         description: Notification Successfully Deleted
 *         content:
 *           text/html; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 *     tags:
 *       - Notifications  
 */
router.delete("/removeNotification", async function (req: any, res: any) {
  try {
    await DBcommand.removeNotification(
      req.query.user_id,
      req.query.cryptoName
    );
    res.send("Favorite Successfully Deleted");
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

/**
 * @openapi
 * /resetNotification:
 *   put:
 *     description: Reset ALL notification for a specific user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *           examples:
 *             '0':
 *               value: |-
 *                 {
 *                   "user_id": "FgstGsdUOmV6MOUsV7yL9Vbvs5g1"
 *                 }
 *     responses:
 *       '200':
 *         description: Notification Successfully Reset
 *         content:
 *           text/html; charset=utf-8:
 *             schema:
 *               type: string
 *             examples: {}
 *     tags:
 *       - Notifications         
 */
router.put("/resetNotification", async function (req: any, res: any) {
  try {
    await DBcommand.resetNotification(req.body.user_id);
    res.send("Notification Successfully Reset");
  } catch (error) {
    console.error(error);
    await res.status(424).json({ error: error });
  }
});

module.exports = router;
