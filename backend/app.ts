var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');

// Load routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = 9666;
app.use(
    cors({
        origin: "*",
    })
)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/cryptohub/api', usersRouter);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// mongoClient.connect(async (err: any) => {
//     if (err) throw err;
//     const collection = mongoClient.db("test").collection("UserPreferences");
//     // perform actions on the collection object
//     console.log("Connected to MongoDB!");
//     await collection.find({user_id: "1234567890"}).forEach(console.dir);
//     mongoClient.close();
// });

module.exports = app;
