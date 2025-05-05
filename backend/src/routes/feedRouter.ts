import { Router } from "express";
import ProfilesFeedController from "../controllers/ProfilesFeedController";

const feedRouter = Router();

feedRouter.get("/profiles", ProfilesFeedController.getProfiles); // In body some filtration params
feedRouter.get("/matches", ProfilesFeedController.getMatches); // In body some filtration params
// feedRouter.post("/profiles/:username", ); // liking a profile, our profile id in body

export default feedRouter;