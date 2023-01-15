var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';


// Load route

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


/**
 * openApi
 */
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contact REST API',
            description: "A REST API built with Express and MongoDB.",
            version: '0.1',
        },
        servers: [
            {
                url: 'http://localhost:9666/api',
                description: 'Development server',
            },
        ],
    },
    apis: ["./js/routes/users.js"],
}

const openapiSpecification = swaggerJsDoc(options);
app.use('/docs', serve, setup(openapiSpecification));

module.exports = app;
