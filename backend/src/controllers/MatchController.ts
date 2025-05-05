import { Request, Response } from "express";
import MatchService from "../services/matchService";

export default class MatchController {
  static async getMatches(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const formattedId = parseInt(id as string);

      const feeds = await MatchService.getMatches(formattedId);

      res.status(200).json(feeds);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error updating user profile",
      });
    }
  }

  static async getLikes(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const formattedId = parseInt(id as string);

      const feeds = await MatchService.getLikes(formattedId);

      res.status(200).json(feeds);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error updating user profile",
      });
    }
  }

  static async setLike(req: Request, res: Response) {
    try {
        const {id, partnerId} = req.body;

        if (!id || !partnerId) {
            throw new Error("Ids are required");
        }

        const matchId = await MatchService.setLike(id, partnerId)
        res.status(200).json(matchId)
    } catch (error) {

    }
  }
}
