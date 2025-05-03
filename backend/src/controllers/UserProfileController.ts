import { Request, Response } from "express";
import userService from "../services/userService";

//CRUD Controller for User Profile
class UserProfileController {
  static async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.query.id;
      console.log("controller", userId)
      const parsedId = parseInt(userId as string);

      const profile = await userService.get(parsedId);

      res.status(200).json({
        status: "success",
        profile,
      });
      return;
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({
        status: "error",
        message: "Error fetching user profile",
      });
      return;
    }
  }

  static async createUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      console.log(data)
      const id = await userService.create(data);

      res.status(201).json({
        status: "success",
        message: "User created successfully",
        id,
      });
      return;
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        status: "error",
        message: "Error creating user profile",
      });
      return;
    }
  }

  static async updateUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.query.id;
      const parsedId = parseInt(userId as string);
      const data = req.body;

      const id = await userService.update(parsedId, data);

      res.status(200).json({
        status: "success",
        message: "User updated successfully",
        id,
      });
      return;
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({
        status: "error",
        message: "Error updating user profile",
      });
      return;
    }
  }

  static async deleteUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.query.id;
      const parsedId = parseInt(userId as string);

      const id = await userService.delete(parsedId);

      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
        id,
      });
      return;
    } catch (error) {
      console.error("Error deleting user profile:", error);
      res.status(500).json({
        status: "error",
        message: "Error deleting user profile",
      });
      return;
    }
  }
}

export default UserProfileController;
