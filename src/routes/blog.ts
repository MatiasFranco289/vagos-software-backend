import { Router } from "express";
import { BlogController } from "../controllers/blog";
import {
  blogCreateValidation,
  blogGetAllValidation,
  blogGetValidation,
  blogUpdateValidation,
} from "../validations/blog";

const blogRouter = Router();

blogRouter.post("/", blogCreateValidation, BlogController.createBlog);
blogRouter.put("/:id", blogUpdateValidation, BlogController.updateBlog);
blogRouter.get("/:id", blogGetValidation, BlogController.getBlog);
blogRouter.get("/", blogGetAllValidation, BlogController.getAllBlogs);

export default blogRouter;
