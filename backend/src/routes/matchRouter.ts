import { Router } from "express";
import MatchController from "../controllers/MatchController";

const matchRouter = Router();

matchRouter.get("/matches", MatchController.getMatches);
matchRouter.get("/matches/likes", MatchController.getLikes);
matchRouter.patch("/likes", MatchController.setLike);

export default matchRouter;