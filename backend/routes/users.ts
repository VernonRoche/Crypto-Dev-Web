var express = require('express');
var router = express.Router();

/* Get User by user_id */
router.get('/getUser', function(req: { query: { user_id: any; }; }, res: { send: (arg0: string ) => string; }, next: any) {
  console.log("id : "+ req.query.user_id);
    
  res.send("Bien Jouer");
});

/* Add User and paras are user_id and email */
router.get('/addUser', function(req: { query: { user_id: any, mail:string };  }, res: { send: (arg0: string) => void; }, next: any) {
  console.log(req.query);
  
  res.send('respond with a resource');
});

/* Delete User by user_id */
router.delete('/deleteUser', function(req: { query: { user_id: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  console.log(req.query);
  res.send('respond with a resource');
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
router.put('/changeEmail', function(req: { query: { user_id: any, newMail:string }; }, res: { send: (arg0: string) => void; }, next: any) {
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
