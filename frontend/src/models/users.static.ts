import type { CUserDocument } from "./user.type";
//sers a rajouter des methodes
export async function findOneOrCreate(this: any,  userId : string):Promise<CUserDocument>{
    const record = await this.findOne({  userId  });
    if(record) {
        return record;
    }else{
        return this.create({  userId  });
    }
}

export async function findByAge(this: any, min?:number,max?:number):Promise<CUserDocument[]> {
    return this.find({ age: { $gte: min || 0, $lte: max || Infinity }
});
}