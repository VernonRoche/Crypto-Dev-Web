export namespace DBcommand {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://astergiou:cryptohub@cryptohubcluster.lxmrqbv.mongodb.net/?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const DBNAME = "CryptohubDB";
    const COLLNAME = "Users";

    export async function getUser(id:number | string): Promise<JSON> {
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        const User = {
            id : id,
        };
        let data = await mongoClient.db(DBNAME).collection(COLLNAME).findOne(User,function(err:any,res:any){
            if (err) throw err;            
        }).toArray();
        
        return data;
    }

    async function isInside(id:number | string ) : Promise<boolean>{
        await mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        const User = {
            id : id,
        };
        let data = await mongoClient.db("CryptohubDB").collection(COLLNAME).findOne(User,function(err:any,res:any){
            if (err) throw err;            
        });
        if(data === null){
            return false;
        }
        return true;
    }

    export async function insertUser(id:number | string, mail:string, favorite:Array<string>, notification:Array<string> ): Promise<void> {
        mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        await isInside(id).then((async function(val:boolean){
            if(val){
                const newUser = {
                    id : id,
                    email: mail,
                    favorite : favorite,
                    notification: notification
                };
                await mongoClient.db(DBNAME).collection(COLLNAME).insertOne(newUser, function(err:any,res:any){
                    if (err) throw err;
                    console.log(res);
                }); 
            }
        }));
    }

    export async function deleteUser(id:number | string): Promise<void> {
        mongoClient.connect(async (err: any, db:any) => {
            if (err) throw err;
        });
        const newUser = {
            id : id,
        };
        await mongoClient.db(DBNAME).collection(COLLNAME).deleteOne(newUser, function(err:any,res:any){
            if (err) throw err;
        }); 
    }


    export async function getFavorite(id:number | string): Promise<void> {
        let data = await getUser(id);        
    }

    export async function addFavorite(id:number | string): Promise<void> {
        let data = await getUser(id);        
    }
    export async function removeFavorite(id:number | string): Promise<void> {
        let data = await getUser(id);        
    }

    export async function changeEmail(id:number | string): Promise<void> {
        let data = await getUser(id);        
    }
    export async function addNotification(id:number | string): Promise<void> {
        let data = await getUser(id);        
    }
    export async function getNotification(id:number | string): Promise<void> {
        let data = await getUser(id);        
    }
    export async function removeNotification(id:number | string): Promise<void> {
        let data = await getUser(id);        
    }
    export async function resetNotification(id:number | string): Promise<void> {
        let data = await getUser(id);        
    }
}