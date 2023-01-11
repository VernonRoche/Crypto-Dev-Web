var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Load routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = 9666;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// load firebase

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// app.post('/:addUser', async (req : any, res : any) => {
//     console.log(req.body);
//     const user = {
//         userid : req.body.userid,
//         email : req.body.email,
//         password : req.body.password
        
//     };
//     const userRecord = await admin.auth().createUser({
//         uid: user.userid,
//         email: user.email,
//         emailVerified: false,
//     });
//     res.send(userRecord.toJSON());
// });        




// Load MongoDB


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://astergiou:cryptohub@cryptohubcluster.lxmrqbv.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

mongoClient.connect(async (err: any) => {
    if (err) throw err;
    const collection = mongoClient.db("test").collection("UserPreferences");
    // perform actions on the collection object
    console.log("Connected to MongoDB!");
    await collection.find({user_id: "1234567890"}).forEach(console.dir);
    mongoClient.close();
});

module.exports = app;
