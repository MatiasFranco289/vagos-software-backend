import { authTests } from "./auth";
import { createProjectTest } from "./projects";
import { tagsTest } from "./tags";
import { projectStatesTest } from "./projectStates";
import { resourcesTest } from "./resources";
import { getAllProjectTest } from "./projects";

describe("sequentially run tests", () => {
  authTests();
  createProjectTest();
  tagsTest();
  projectStatesTest();
  resourcesTest();
  getAllProjectTest();
});
