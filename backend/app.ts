var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');

// Load MongoDB


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://astergiou:cryptohub@cryptohubcluster.lxmrqbv.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


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

app.use('/cryptohub/api', usersRouter);
//app.use(usersRouter);

app.use(
    cors({
        origin: "*"//`http://localhost:${port}`  
    })
)

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
