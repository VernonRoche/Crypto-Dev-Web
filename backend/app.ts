var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');

// Load routes

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



app.use('/cryptohub/api', usersRouter);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

/*
mongoClient.connect(async (err: any,db:any) => {
    if (err) throw err;
    let CryptoDB:any = db.db("CryptohubDB");
    /*
    await CryptoDB.createCollection("Users",function(err:any,res:any) {
        if (err) throw err;
        console.log("Collection created ! ");
        db.close();
    });
    
});
*/

module.exports = app;
