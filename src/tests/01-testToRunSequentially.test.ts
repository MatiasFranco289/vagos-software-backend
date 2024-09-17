import { authTests } from "./auth";
import { createProjectTest } from "./projects";
import { tagsTest } from "./tags";
import { projectStatesTest } from "./projectStates";
import { resourcesTest } from "./resources";
import { getAllProjectTest } from "./projects";
import { createBlogsTest } from "./blogs";
import { getProjectById } from "./projects";
import { createUserTest } from "./users";
import {
  createResourceTypeTest,
  deleteResourceTypeTest,
  getAllResourceTypesTest,
  updatedResourceTypeTest,
} from "./resourceTypes";

describe("sequentially run tests", () => {
  authTests();
  createProjectTest();
  tagsTest();
  projectStatesTest();
  resourcesTest();
  getAllProjectTest();
  createBlogsTest();
  getProjectById();
  createUserTest();
  getAllResourceTypesTest();
  createResourceTypeTest();
  updatedResourceTypeTest();
  deleteResourceTypeTest();
});
