import { authTests } from "./auth";
import { projectsTests } from "./projects";
import { tagsTest } from "./tags";

describe("sequentially run tests", () => {
  authTests();
  projectsTests();
  tagsTest();
});
