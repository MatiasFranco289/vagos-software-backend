// This file imports differents arrays of entities following it's corresponding interfaces
// and preloads it
import roles from "../../resources/preloadedData/roles";
import users from "../../resources/preloadedData/users";
import tags from "../../resources/preloadedData/tags";
import userStatus from "../../resources/preloadedData/userStatus";
import projectStatus from "../../resources/preloadedData/projectStatus";
import resourceTypes from "../../resources/preloadedData/resourceTypes";
import projects from "../../resources/preloadedData/projects";

import Role from "../models/Role";
import User from "../models/User";
import Tag from "../models/Tag";
import UserStatus from "../models/UserStatus";
import ProjectStatus from "../models/ProjectStatus";
import ResourceType from "../models/ResourceType";
import Project from "../models/Project";

export default async function preloadData() {
  console.log("Preloading entities.");

  await Role.bulkCreate(roles);
  await UserStatus.bulkCreate(userStatus);
  await User.bulkCreate(await users());
  await Tag.bulkCreate(tags);
  await ProjectStatus.bulkCreate(projectStatus);
  await Project.bulkCreate(projects);
  await ResourceType.bulkCreate(resourceTypes);

  console.log("Entities preloaded successfully.");
}
