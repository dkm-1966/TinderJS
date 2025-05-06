import database from "../config/database";
import userRepository from "../repositories/userRepository";

export class AuthService {
  static async register(email: string, password: string): Promise<number> {
    try {
      await database.query("BEGIN");
      const userId = await userRepository.createUser({ email, password });
      await database.query("COMMIT");

      return userId;
    } catch (error) {
      await database.query("ROLLBACK");
      throw error;
    }
  }

  static async login(email: string, password: string): Promise<number> {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return user.id;
  }
}
