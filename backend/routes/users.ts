var express = require('express');
var router = express.Router();

/* Get User by userid */
router.get('/getUser', function(req: { query: { user_id: any; }; }, res: { send: (arg0: string ) => string; }, next: any) {
  console.log("id : "+ req.query.user_id);
  
  res.send("Bien Jouer");
});

/* Add User and paras are userid and email */
router.post('/addUser', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Delete User by userid */
router.delete('/deleteUser', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});
/* Get Favorite and params are userid and return a string[] */
router.get('/getFavorite', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Add Favorite and params are userid and cryptoname */
router.post('/addFavorite', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Remove Favorite and params are userid and cryptoname */
router.delete('/removeFavorite', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Change Email and params are userid  and new email */
router.put('/changeEmail', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Add Notification and params  are userid cryptoname and targetValue */
router.post('/addNotification', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* get notification and params are userid and return a notification_object[] */
router.get('/getNotification', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Remove Notification and params are userid cryptoname  */
router.delete('/removeNotification', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});

/* Reset notification and params is userid */
router.put('/resetNotification', function(req: { params: { userid: any; }; }, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});



module.exports = router;
