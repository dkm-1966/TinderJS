import database from "../config/database";
import { IUser } from "../models/interfaces/User/IUser";
import { User } from "../models/User";

export interface IUserWithId extends IUser {
  id: number;
}

export default class userRepository {
  static async createUser(data: IUser): Promise<number> {
    // const user = await User.create({
    //   email: data.email,
    //   password: data.password,
    // });

    // return user.id;
    //without orm
    const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`;
    const values = [data.email, data.password];
    const result = await database.query(query, values);

    return result.rows[0].id;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    // const user = await User.findOne({
    //   where: { email },
    // });

    // return user;
    //without orm
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await database.query(query, values);

    return result.rows[0];
  }
}
