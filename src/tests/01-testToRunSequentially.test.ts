import { authTests } from "./auth";
import { projectsTests } from "./projects";
import { tagsTest } from "./tags";
import { projectStatesTest } from "./projectStates";
import { resourcesTest } from "./resources";
describe("sequentially run tests", () => {
  authTests();
  projectsTests();
  tagsTest();
  projectStatesTest();
  resourcesTest();
});
