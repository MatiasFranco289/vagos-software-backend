import { Router } from "express";
import { blogsController } from "../controllers/blogs";
import { createBlogValidation } from "../validations/blogs";

const blogsAdminRouter = Router();

blogsAdminRouter.post("/", createBlogValidation, blogsController.createBlog);

export default blogsAdminRouter;
