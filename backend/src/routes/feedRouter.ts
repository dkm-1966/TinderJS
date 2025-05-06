import { Router } from "express";
import ProfilesFeedController from "../controllers/ProfilesFeedController";

const feedRouter = Router();

feedRouter.get("/profiles", ProfilesFeedController.getProfiles); 
feedRouter.get("/profiles/by-id", ProfilesFeedController.getById); 

export default feedRouter;