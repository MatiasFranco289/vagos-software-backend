import { STATUS_CODE_BAD_REQUEST, STATUS_CODE_OK } from "../constants";
import app from "../index";
import { ApiResponse } from "../interfaces";
import User from "../models/User";
import request from "supertest";
import {
  CREATOR_NOT_FOUND_MESSAGE,
  STATUS_ID_NOT_FOUND_MESSAGE,
  TAG_NOT_FOUND_MESSAGE,
} from "../controllers/projects";
import Tag, { TagCreationAttributes } from "../models/Tag";
import Project, { ProjectCreationAtributes } from "../models/Project";
import ProjectStatus from "../models/ProjectStatus";
import Resource from "../models/Resource";
import ResourceType from "../models/ResourceType";
import Board from "../models/Board";
import { SUCCESS_PROJECTS_RETRIVED_MESSAGE } from "../controllers/projects";

export const createProjectTest = () =>
  describe("POST /api/admin/projects", () => {
    beforeAll(async () => {
      await Tag.bulkCreate([
        {
          id: 1,
          name: "2D",
        },
        {
          id: 2,
          name: "3D",
        },
        {
          id: 3,
          name: "Metroidvania",
        },
      ]);

      await ProjectStatus.create({
        id: 1,
        name: "ACTIVE",
      });

      await ResourceType.create({
        id: 1,
        name: "test_resource",
      });
    });

    afterAll(async () => {
      await Project.destroy({ where: {} });
      await ProjectStatus.destroy({ where: {} });
      await ResourceType.destroy({ where: {} });
      await Resource.destroy({ where: {} });
      await Tag.destroy({ where: {} });
    });

    it("Should return an error if non-existent user id are passed", async () => {
      const response = await request(app)
        .post("/api/admin/projects")
        .set("Cookie", global.accessToken)
        .send({
          title: "test project",
          description: "test description",
          thumbnail_url: "www.google.com",
          start_date: "2024-08-13",
          status_id: 1,
          repository_url: "www.github.com",
          tags_id: [1, 2],
          creator_id: 2,
        });

      const body: ApiResponse<any> = response.body;

      expect(response.status).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(body.status_code).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(body.message).toEqual(CREATOR_NOT_FOUND_MESSAGE);
    });

    it("Should return an error if non-existent status_id are passed", async () => {
      const response = await request(app)
        .post("/api/admin/projects")
        .set("Cookie", global.accessToken)
        .send({
          title: "test project",
          description: "test description",
          thumbnail_url: "www.google.com",
          start_date: "2024-08-13",
          status_id: 10,
          repository_url: "www.github.com",
          tags_id: [1, 2],
          creator_id: 1,
        });

      const body: ApiResponse<any> = response.body;

      expect(response.status).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(body.status_code).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(body.message).toEqual(STATUS_ID_NOT_FOUND_MESSAGE);
    });

    it("Should return an error if non-existent tag_id are passed", async () => {
      const response = await request(app)
        .post("/api/admin/projects")
        .set("Cookie", global.accessToken)
        .send({
          title: "test project",
          description: "test description",
          thumbnail_url: "www.google.com",
          start_date: "2024-08-13",
          status_id: 1,
          repository_url: "www.github.com",
          tags_id: [1, 2, 9, 4],
          creator_id: 1,
        });

      const body: ApiResponse<any> = response.body;

      expect(response.status).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(body.status_code).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(body.message).toEqual(TAG_NOT_FOUND_MESSAGE);
    });

    it("Should successfully create a project and all it's associations if everything is correct.", async () => {
      await request(app)
        .post("/api/admin/projects")
        .set("Cookie", global.accessToken)
        .send({
          title: "test project",
          description: "test description",
          thumbnail_url: "www.google.com",
          start_date: "2024-08-13",
          status_id: 1,
          repository_url: "www.github.com",
          tags_id: [1, 2, 3],
          creator_id: 1,
        });

      // create resources related to this project
      await Resource.bulkCreate([
        {
          id: 1,
          url: "www.test.com",
          typeId: 1,
          projectId: 1,
        },
        {
          id: 2,
          url: "www.test2.com",
          typeId: 1,
          projectId: 1,
        },
      ]);

      // get the created project including related models
      const retrievedProject = await Project.findByPk(1, {
        include: [
          {
            model: Tag,
            as: "tags",
          },
          {
            model: Resource,
            as: "resources",
          },
          {
            model: User,
            as: "creator",
          },
          {
            model: Board,
            as: "board",
          },
        ],
      });

      const retrievedProjectResponse = retrievedProject.dataValues;

      expect(retrievedProject.title).toBe("test project");
      expect(retrievedProject.description).toBe("test description");
      expect(retrievedProjectResponse.tags.length).toEqual(3);
      expect(retrievedProjectResponse.resources.length).toEqual(2);
      expect(retrievedProjectResponse.creator).not.toBeNull();
      expect(retrievedProjectResponse.board).not.toBeNull();
    });
  });

export const getAllProjectTest = () =>
  describe("GET /api/project", () => {
    beforeAll(async () => {
      // Create some tags
      let tagsToCreate: Array<TagCreationAttributes> = [
        {
          id: 1,
          name: "2D",
        },
        {
          id: 2,
          name: "3D",
        },
        {
          id: 3,
          name: "Roguelike",
        },
      ];

      let createdTags = await Tag.bulkCreate(tagsToCreate);

      // create a project status
      await ProjectStatus.create({
        id: 1,
        name: "ACTIVE",
      });

      let projectsToCreate: Array<ProjectCreationAtributes> = [];

      for (let i = 0; i < 10; i++) {
        projectsToCreate.push({
          id: i + 1,
          title: `test_${i}`,
          thumbnailUrl: "www.test.png",
          description: "test description",
          startDate: "2024-08-13",
          endDate: "2024-08-13",
          expectedEndDate: "2024-08-13",
          repositoryUrl: "www.github.com",
          statusId: 1,
          creatorId: 1,
        });
      }

      let createdProjects = await Project.bulkCreate(projectsToCreate);

      await createdProjects[0].addTags([createdTags[0]]);
      await createdProjects[1].addTags([createdTags[0], createdTags[1]]);
      await createdProjects[2].addTags(createdTags);
    });

    afterAll(async () => {
      await Project.destroy({ where: {} });
      await ProjectStatus.destroy({ where: {} });
      await Tag.destroy({ where: {} });
    });

    it("Should return all projects", async () => {
      const response = await request(app)
        .get("/api/projects")
        .set("Cookie", global.accessToken);

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_OK);
      expect(bodyResponse.data).toHaveLength(10);
      expect(bodyResponse.message).toBe(SUCCESS_PROJECTS_RETRIVED_MESSAGE);
    });

    it("Should return only 5 project if limit is set to 5", async () => {
      const response = await request(app)
        .get("/api/projects?limit=5")
        .set("Cookie", global.accessToken);

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_OK);
      expect(bodyResponse.data).toHaveLength(5);
      expect(bodyResponse.message).toBe(SUCCESS_PROJECTS_RETRIVED_MESSAGE);
    });

    it("Should return only the last project if offset is set to 9", async () => {
      const response = await request(app)
        .get("/api/projects?offset=9")
        .set("Cookie", global.accessToken);

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_OK);
      expect(bodyResponse.data).toHaveLength(1);
      expect(bodyResponse.data[0].id).toBe(10);
      expect(bodyResponse.message).toBe(SUCCESS_PROJECTS_RETRIVED_MESSAGE);
    });

    it("Should return the projec having title 'test_9' if order by title in descending order", async () => {
      const response = await request(app)
        .get("/api/projects?order_by=title&order=DESC")
        .set("Cookie", global.accessToken);

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_OK);
      expect(bodyResponse.data[0].title).toBe("test_9");
      expect(bodyResponse.message).toBe(SUCCESS_PROJECTS_RETRIVED_MESSAGE);
    });

    it("Should retrieve the correct project when searching by title", async () => {
      const response = await request(app)
        .get("/api/projects?search=test_4")
        .set("Cookie", global.accessToken);

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_OK);
      expect(bodyResponse.data[0].title).toBe("test_4");
      expect(bodyResponse.message).toBe(SUCCESS_PROJECTS_RETRIVED_MESSAGE);
    });

    it("Should get all the project having the correct tags", async () => {
      const response = await request(app)
        .get("/api/projects?tags=2D,3D")
        .set("Cookie", global.accessToken);

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_OK);
      expect(bodyResponse.data).toHaveLength(2);

      expect(bodyResponse.data[0].title).toBe("test_1");
      expect(bodyResponse.data[1].title).toBe("test_2");

      expect(bodyResponse.message).toBe(SUCCESS_PROJECTS_RETRIVED_MESSAGE);
    });

    it("If there are no project with all the provided tags, should retrieve an empty array", async () => {
      const response = await request(app)
        .get("/api/projects?tags=2D,3D,Roguelike,Metroidvania")
        .set("Cookie", global.accessToken);

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_OK);
      expect(bodyResponse.data).toHaveLength(0);
      expect(bodyResponse.message).toBe(SUCCESS_PROJECTS_RETRIVED_MESSAGE);
    });
  });
