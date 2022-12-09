import * as Mongoose from "mongoose";
import {mongoURI} from "../db.config";

let database: Mongoose.Connection;

export const connect = () => {
    if(database){
        return;
    }
    Mongoose.connect(mongoURI, {
     /*   useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true, */
    });
    database = Mongoose.connection;
    database.once("open",async () => {
        console.log("connected to database");
    });
    database.on("error", () => {
        console.log("Error Connecting to Database");
    });
};

export const disconnect = () => {
    if(!database){
        return;
    }
    Mongoose.disconnect();
};