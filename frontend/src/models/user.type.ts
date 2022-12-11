import type { Document, Model } from "mongoose";

export interface CUser {
  mail: string;
  firstname: string;
  lastname: string;
  age: number;
  dateofbirth: Date;
  meta: string;
}

export interface CUserDocument extends CUser, Document {}
export interface CUserModel extends Model<CUserDocument> {
  findOneOrCreate: ({
    firstname,
    lastname,
  }: {
    firstname: string;
    lastname: string;
  }) => Promise<CUserDocument[]>;

  findByAge: (min?: number, max?: number) => Promise<CUserDocument[]>;
}
