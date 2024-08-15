import { authTests } from "./auth";
import { projectsTests } from "./projects";

describe("sequentially run tests", () => {
  authTests();
  projectsTests();
});
