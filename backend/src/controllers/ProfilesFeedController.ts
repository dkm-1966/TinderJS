import { Request, Response } from "express";
import feedService from "../services/feedService";

export default class ProfilesFeedController {
  static async getProfiles(req: Request, res: Response) {
    try {
      const { limit, offset, id } = req.query;
      
      let interestsRaw = req.query.interest; 
      console.log(limit, offset, id, interestsRaw)

      let interests: string[] = [];

      if (interestsRaw) {
        if (Array.isArray(interestsRaw)) {
          interests = interestsRaw.map(i => String(i));
        }
      }
      
      const formattedLimit = parseInt(limit as string)
      const formattedOffset = parseInt(offset as string)
      const formattedId = parseInt(id as string)
      const feeds = await feedService.get(formattedLimit, formattedOffset, formattedId, interests);
      res.status(200).json(feeds);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error while getting profiles",
      });
    }
  }

  static async getById(req: Request, res: Response) {
    console.log("In")
    try {
      const id = req.query.id;
      const formattedId = parseInt(id as string);

      const profile = await feedService.getById(formattedId);

      res.status(200).json(profile);
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Error while getting profile",
      });
    }
  }
}
