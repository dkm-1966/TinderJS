import { Request, Response } from "express";
import feedService from "../services/feedService";

export default class ProfilesFeedController {
  static async getProfiles(req: Request, res: Response) {
    try {
      const { limit, offset } = req.query;
      
      let interestsRaw = req.query.interest; 
      let interests: string[] = [];

      if (interestsRaw) {
        if (Array.isArray(interestsRaw)) {
          interests = interestsRaw.map(i => String(i));
        }
      }
      
      const formattedLimit = parseInt(limit as string)
      const formattedOffset = parseInt(offset as string)
      const feeds = await feedService.get(formattedLimit, formattedOffset, interests);
      res.status(200).json(feeds);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error updating user profile",
      });
    }
  }

  static async getMatches(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const formattedId = parseInt(id as string)

      const feeds = await feedService.getMatches(formattedId);
      res.status(200).json(feeds);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error updating user profile",
      });
    }
  }
}
