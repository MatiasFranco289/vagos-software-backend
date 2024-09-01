import request from "supertest";
import app from "..";
import { ApiResponse } from "../interfaces";
import { STATUS_CODE_BAD_REQUEST, STATUS_CODE_CREATED } from "../constants";
import {
  PROJECT_NOT_FOUND_MESSAGE,
  SUCCESSFUL_BLOG_CREATION_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from "../controllers/blogs";
import Project from "../models/Project";
import Tag from "../models/Tag";
import ProjectStatus from "../models/ProjectStatus";

export const createBlogsTest = () =>
  describe("POST /api/admin/blogs", () => {
    let blogToCreate = {
      title: "test blog",
      description: "test blog description",
      user_id: 10,
      project_id: 10,
    };

    beforeAll(async () => {
      const tags = await Tag.bulkCreate([
        {
          id: 1,
          name: "test-tag-1",
        },
        {
          id: 2,
          name: "test-tag-2",
        },
      ]);

      await ProjectStatus.create({
        id: 1,
        name: "test",
      });

      await Project.create({
        id: 1,
        title: "test project",
        description: "test project description",
        thumbnailUrl: "https://www.test-thumbnail.com",
        startDate: "2024-08-13",
        statusId: 1,
        repositoryUrl: "https://www.test-repository.com",
        tags: tags,
        creatorId: 1,
      });
    });

    afterAll(async () => {
      await Project.destroy({ where: {} });
      await ProjectStatus.destroy({ where: {} });
      await Tag.destroy({ where: {} });
    });

    it("Should return an error if non-existent project id are passed", async () => {
      const response = await request(app)
        .post("/api/admin/blogs")
        .set("Cookie", global.accessToken)
        .send(blogToCreate);

      const responseBody: ApiResponse<null> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(responseBody.status_code).toBe(STATUS_CODE_BAD_REQUEST);
      expect(responseBody.message).toBe(PROJECT_NOT_FOUND_MESSAGE);
    });

    it("Should return an error if non-existent user id are passed", async () => {
      blogToCreate.project_id = 1;

      const response = await request(app)
        .post("/api/admin/blogs")
        .set("Cookie", global.accessToken)
        .send(blogToCreate);

      const bodyResponse: ApiResponse<null> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.message).toBe(USER_NOT_FOUND_MESSAGE);
    });

    it("Should create the blog successfully if user id and project id are correct", async () => {
      blogToCreate.user_id = 1;

      const response = await request(app)
        .post("/api/admin/blogs")
        .set("Cookie", global.accessToken)
        .send(blogToCreate);

      const bodyResponse: ApiResponse<null> = response.body;

      expect(response.status).toBe(STATUS_CODE_CREATED);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_CREATED);
      expect(bodyResponse.message).toBe(SUCCESSFUL_BLOG_CREATION_MESSAGE);
    });
  });
