export namespace DBcommand {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://astergiou:cryptohub@cryptohubcluster.lxmrqbv.mongodb.net/?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    let DBNAME = "";
    const COLLNAME = "UserPreferences";

    export function option(optiontest: number): string {
        if (optiontest == 1) {
            DBNAME = "CryptohubDB";
        }
        else if (optiontest == 2) {
            DBNAME = "test";
        }
        return DBNAME;
    }

    export async function getUser(id:number | string, optiontest: number): Promise<JSON> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        const User = {
            user_id : id,
        };
        return await mongoClient.db(DBNAME).collection(COLLNAME).findOne(User);
    }

    async function isInside(id:number | string ) : Promise<boolean>{
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        const User = {
            user_id : id,
        };
        let data = await mongoClient.db("CryptohubDB").collection(COLLNAME).findOne(User,function(err:any,res:any){
            if (err) throw err;
        });
        if(data === null){
            return false;
        }
        return User.user_id != null;

    }

    export async function insertUser(id:number | string, mail:string, favorite:Array<string>, notification:Array<string> ,optiontest: number): Promise<void> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        await isInside(id).then((async function(val:boolean){
            if(val){                
                const newUser = {
                    user_id : id,
                    email: mail,
                    favorite : favorite,
                    notification: notification,
                };
                await mongoClient.db(DBNAME).collection(COLLNAME).insertOne(newUser, function(err:any,res:any){
                    if (err) throw err;
                });
            }
        }));
    }

    export async function deleteUser(id:number | string , optiontest: number): Promise<void> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        const User = {
            user_id : id,
        };
        await mongoClient.db(DBNAME).collection(COLLNAME).deleteOne(User, function(err:any,res:any){
            if (err) throw err;
        });
    }


    export async function getFavorite(id:number | string , optiontest: number): Promise<JSON> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        const User = {
            user_id : id,
        };
        const projection = {
            favorite: 1
        };
        return await mongoClient.db(DBNAME).collection(COLLNAME).find(User).project(projection).toArray();        
    }

    export async function addFavorite(id:number | string, cryptoName:string , optiontest: number): Promise<void> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        await mongoClient.db(DBNAME).collection(COLLNAME).updateOne({ user_id : id },{ $push: {  favorite: cryptoName  }  },function(err:any,res:any){
            if (err) throw err;            
        });
    }

    export async function removeFavorite(id:number | string, cryptoName:any , optiontest: number): Promise<void> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        const User = {
            user_id : id,
        };
        
        const ValuetoRemove = {
        $pull: {  favorite: {name: cryptoName }  }
        };
        
        await mongoClient.db(DBNAME).collection(COLLNAME).updateOne(User,ValuetoRemove,function(err:any,res:any){
            if (err) throw err;            
        });
    }

    export async function changeEmail(id:number | string, newMail:string, optiontest: number): Promise<void> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        await mongoClient.db(DBNAME).collection(COLLNAME).updateOne({user_id: id},{ $set: {  email: newMail  }});
    }

    export async function addNotification(id:number | string, cryptoName:string, targeValue:string | number , optiontest: number): Promise<void> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        const User = {
            user_id : id,
        };
        const newValue = {
            $push: {  
                "notification.$": {
                    name : cryptoName,
                    targetvalue: targeValue
                },
            }
        };
        await mongoClient.db(DBNAME).collection(COLLNAME).updateOne(User,newValue);
    }


    export async function getNotification(id:number | string , optiontest: number): Promise<void> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        const User = {
            user_id : id,
        };
        const projection = {
            notification: 1
        };
        return mongoClient.db(DBNAME).collection(COLLNAME).find(User, function (err: any, res: any) {
            if (err) throw err;
        }).project(projection);
    }


    export async function removeNotification(id:number | string, cryptoName:string ,optiontest: number): Promise<void> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        const User = {
            user_id : id,
        };
        const ValueToRemove = {
            $pull: {  notification: {
                name : cryptoName
            }
        }
        };
        await mongoClient.db(DBNAME).collection(COLLNAME).updateOne(User,ValueToRemove);
    }

    export async function resetNotification(id:number | string , optiontest: number): Promise<void> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        option(optiontest);
        const User = {
            user_id : id,
        };
        const ValueToRemove = {
            $set: { notification: []  }
        };
        await mongoClient.db(DBNAME).collection(COLLNAME).updateOne(User,ValueToRemove);
}

}