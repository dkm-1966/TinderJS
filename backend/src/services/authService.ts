import userRepository from "../repositories/userRepository";

export class AuthService {
  static async register(email: string, password: string): Promise<number> {
    const userId = await userRepository.createUser({email, password });
    return userId;
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
