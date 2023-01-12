"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBcommand = void 0;
var DBcommand;
(function (DBcommand) {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://astergiou:cryptohub@cryptohubcluster.lxmrqbv.mongodb.net/?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const DBNAME = "CryptohubDB";
    const COLLNAME = "Users";
    function getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoClient.connect((err, db) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
            }));
            const User = {
                id: id,
            };
            let data = yield mongoClient.db(DBNAME).collection(COLLNAME).findOne(User, function (err, res) {
                if (err)
                    throw err;
            }).toArray();
            return data;
        });
    }
    DBcommand.getUser = getUser;
    function isInside(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoClient.connect((err, db) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
            }));
            const User = {
                id: id,
            };
            let data = yield mongoClient.db("CryptohubDB").collection(COLLNAME).findOne(User, function (err, res) {
                if (err)
                    throw err;
            });
            if (data === null) {
                return false;
            }
            return true;
        });
    }
    function insertUser(id, mail, favorite, notification) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoClient.connect((err, db) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
            }));
            yield isInside(id).then((function (val) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (val) {
                        const newUser = {
                            id: id,
                            email: mail,
                            favorite: favorite,
                            notification: notification
                        };
                        yield mongoClient.db(DBNAME).collection(COLLNAME).insertOne(newUser, function (err, res) {
                            if (err)
                                throw err;
                            console.log(res);
                        });
                    }
                });
            }));
        });
    }
    DBcommand.insertUser = insertUser;
    function deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoClient.connect((err, db) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
            }));
            const newUser = {
                id: id,
            };
            yield mongoClient.db(DBNAME).collection(COLLNAME).deleteOne(newUser, function (err, res) {
                if (err)
                    throw err;
            });
        });
    }
    DBcommand.deleteUser = deleteUser;
    function getFavorite(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield getUser(id);
        });
    }
    DBcommand.getFavorite = getFavorite;
    function addFavorite(id, cryptoName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoClient.connect((err, db) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw err;
            }));
            const User = {
                id: id,
            };
            const newValue = {
                $push: { "favorite.$": cryptoName }
            };
            yield mongoClient.db(DBNAME).collection(COLLNAME).updateOne(User, newValue, function (err, res) {
                if (err)
                    throw err;
            });
        });
    }
    DBcommand.addFavorite = addFavorite;
    function removeFavorite(id, cryptoName) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield getUser(id);
        });
    }
    DBcommand.removeFavorite = removeFavorite;
    function changeEmail(id, newMail) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield getUser(id);
        });
    }
    DBcommand.changeEmail = changeEmail;
    function addNotification(id, cryptoName, targeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield getUser(id);
        });
    }
    DBcommand.addNotification = addNotification;
    function getNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield getUser(id);
        });
    }
    DBcommand.getNotification = getNotification;
    function removeNotification(id, cryptoName) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield getUser(id);
        });
    }
    DBcommand.removeNotification = removeNotification;
    function resetNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield getUser(id);
        });
    }
    DBcommand.resetNotification = resetNotification;
})(DBcommand = exports.DBcommand || (exports.DBcommand = {}));
