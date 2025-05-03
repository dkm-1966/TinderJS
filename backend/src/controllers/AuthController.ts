import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export default class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userId = await AuthService.register(email, password);

      res.status(201).json({ message: "User loged in", userId });
      return 
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: error });
      return
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userId = await AuthService.login(email, password);

      if (userId) {
        res.status(200).json({ message: "User loged in", userId });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }

      return
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: error });
      return
    }
  }
}
