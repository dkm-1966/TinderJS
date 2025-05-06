import database from "../config/database";
import { IUser } from "../models/interfaces/User/IUser";

export interface IUserWithId extends IUser {
    id: number;
}

export default class userRepository {
    static async createUser(data: IUser): Promise<number> {
        const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`;
        const values = [data.email, data.password];
        const result = await database.query(query, values);

        return result.rows[0].id;
    }

    static async getUserByEmail(email: string): Promise<IUserWithId | undefined> {
        const query = `SELECT * FROM users WHERE email = $1`;
        const values = [email];
        const result = await database.query(query, values);

        return result.rows[0];
    }
}