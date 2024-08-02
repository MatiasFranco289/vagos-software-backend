import request from "supertest";
import app from "../src/index";
import ProjectTag from "../src/models/ProjectTag";
import { STATUS_CODE } from "../src/constants";

const projectTagsToCreate = [
  { name: "2D" },
  { name: "3D" },
  { name: "Roguelike" },
];

describe("/api/project-tag", () => {
  // I delete all project-tags and create news before each test
  beforeEach(async () => {
    await ProjectTag.destroy({
      where: {},
      truncate: true,
    });

    await ProjectTag.bulkCreate(projectTagsToCreate);
  });

  describe("GET /api/project-tag", () => {
    let apiResponse;

    beforeEach(async () => {
      apiResponse = await request(app).get("/api/project-tag");
    });

    it("Should return a status code 200", () => {
      expect(apiResponse.status).toBe(STATUS_CODE.ok);
    });

    it("Should return an array", () => {
      const body = apiResponse.body.data;

      expect(body).toBeInstanceOf(Array);
    });

    it("All objects in the array response should follow the interface ApiResponse", () => {
      const body = apiResponse.body;

      expect(body).toHaveProperty("statusCode");
      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("data");
    });

    it("Should return all created project-tags", () => {
      const createdTagsName = projectTagsToCreate.map((tag) => {
        return tag.name;
      });
      const tags = apiResponse.body.data;

      tags.forEach((tag) => {
        expect(createdTagsName).toContain(tag.name);
      });
    });
  });
});
