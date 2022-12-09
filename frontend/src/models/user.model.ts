import {model} from "mongoose";
import type {CUserDocument} from "./user.type"
import UserSchema  from "./user.schema";
export const UserModel = model<CUserDocument>("user",UserSchema);