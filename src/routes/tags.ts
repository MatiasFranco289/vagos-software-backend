import { Router } from "express";
import { tagsController } from "../controllers/tags";

const tagRouter = Router();

tagRouter.get("/all", tagsController.getAllTags);

export default tagRouter;
