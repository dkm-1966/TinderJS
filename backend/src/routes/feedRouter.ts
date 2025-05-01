import { Router } from "express";

const feedRouter = Router();

// feedRouter.get("/profiles", ); // In body some filtration params, isLiked param in query string
// feedRouter.get("/profiles/:username", );// viewing a specific profile
// feedRouter.post("/profiles/:username", ); // liking a profile, our profile id in body

export default feedRouter;