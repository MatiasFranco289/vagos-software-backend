import { STATUS_CODE_BAD_REQUEST } from "../constants";
import app from "../index";
import { ApiResponse } from "../interfaces";
import Role from "../models/Role";
import User from "../models/User";
import UserStatus from "../models/UserStatus";
import { encryptPassword } from "../utils";
import request from "supertest";
import {
  CREATOR_NOT_FOUND_MESSAGE,
  STATUS_ID_NOT_FOUND_MESSAGE,
  TAG_NOT_FOUND_MESSAGE,
} from "../controllers/projectsAdmin";
import Tag from "../models/Tag";
import Project from "../models/Project";
import ProjectStatus from "../models/ProjectStatus";
import Resource from "../models/Resource";
import ResourceType from "../models/ResourceType";
import Board from "../models/Board";

export const projectsTests = () =>
  describe("POST /api/admin/projects", () => {
    let adminRole: Role;
    let activeStatus: UserStatus;
    let encryptedUserPassword: string;
    let creator: User;
    let accessToken: string;

    beforeAll(async () => {
      adminRole = await Role.create({
        id: 1,
        name: "ADMIN",
      });

      activeStatus = await UserStatus.create({
        id: 1,
        name: "ACTIVE",
      });

      encryptedUserPassword = await encryptPassword("test");

      creator = await User.create({
        id: 1,
        username: "test",
        email: "test@gmail.com",
        password: encryptedUserPassword,
        roleId: adminRole.id,
        statusId: activeStatus.id,
      });

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

      // I need to authenticate to get access_token before call others endpoints
      const authResponse = await request(app).post("/api/auth/login").send({
        username: "test",
        password: "test",
      });

      const cookies = authResponse.headers["set-cookie"];
      accessToken = cookies[0].split(";")[0];
    });

    afterAll(async () => {
      await ResourceType.destroy({ where: {} });
      await Resource.destroy({ where: {} });
      await Project.destroy({ where: {} });
      await ProjectStatus.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Role.destroy({ where: {} });
      await UserStatus.destroy({ where: {} });
      await Tag.destroy({ where: {} });
    });

    it("Should return an error if non-existent user id are passed", async () => {
      const response = await request(app)
        .post("/api/admin/projects")
        .set("Cookie", accessToken)
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
        .set("Cookie", accessToken)
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
        .set("Cookie", accessToken)
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
        .set("Cookie", accessToken)
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
