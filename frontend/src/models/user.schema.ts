import { Schema } from "mongoose";
import { findByAge, findOneOrCreate } from "./users.static";

//exemple a modifer
const UserSchema = new Schema({
    mail: String,
    firstname: String,
    lastname: String,
    age: Number,
    dateofbirth: {type: Date, default: Date.now},
    meta: {
        favorite: [String]
    }
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.statics.findByAge = findByAge;

export default UserSchema;