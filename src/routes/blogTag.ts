import { Router } from "express";
import { BlogTagController } from "../controllers/blogTag";
import {
  blogTagCreateValidation,
  blogTagDeleteValidation,
  blogTagGetValidation,
  blogTagUpdateValidation,
} from "../validations/blogTag";

const blogTagRouter = Router();

blogTagRouter.post(
  "/",
  blogTagCreateValidation,
  BlogTagController.createBlogTag
);
blogTagRouter.put(
  "/:id",
  blogTagUpdateValidation,
  BlogTagController.updateBlogTag
);
blogTagRouter.delete(
  "/:id",
  blogTagDeleteValidation,
  BlogTagController.deleteBlogTag
);
blogTagRouter.get("/:id", blogTagGetValidation, BlogTagController.getBlogTag);
blogTagRouter.get("/", BlogTagController.getAllBlogTags);

/*
import {
  projectTagCreateValidation,
  projectTagDeleteValidation,
  projectTagGetValidation,
  projectTagUpdateValidation,
} from "../validations/projectTag";

projectTagRouter.post(
  "/",
  projectTagCreateValidation,
  ProjectTagController.createProjectTag
);
projectTagRouter.put(
  "/:id",
  projectTagUpdateValidation,
  ProjectTagController.updateProjectTag
);
projectTagRouter.delete(
  "/:id",
  projectTagDeleteValidation,
  ProjectTagController.deleteProjectTags
);
projectTagRouter.get(
  "/:id",
  projectTagGetValidation,
  ProjectTagController.getProjectTag
);
projectTagRouter.get("/", ProjectTagController.getAllProjectTags);
*/
export default blogTagRouter;
