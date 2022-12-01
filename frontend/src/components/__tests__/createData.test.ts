import { test, it, expect } from 'vitest'
import { UserModel } from "@/models/user.model";
import { connect, disconnect } from "@/database";
test('create data for database test',async() => {
    connect();

    const users = [
        {mail: "test@gmail.com",  firstname: "jack",  lastname: "lawson",  age: "20"},
        {mail: "test22@gmail.com",  firstname: "elise",  lastname: "moss",  age: "80"},
        {mail: "aaa@gmail.com",  firstname: "1",  lastname: "23",  age: "-99"},
    ];

    try {
        for (const user of users) {
            await UserModel.create(user);
            console.log(`Created user ${user.firstname} ${user.lastname}`);
        }
        disconnect();
    } catch (error) {
        console.error(error);
    }

})