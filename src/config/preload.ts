// This file imports differents arrays of entities following it's corresponding interfaces
// and preloads it
import roles from "../../resources/preloadedData/roles";
import users from "../../resources/preloadedData/users";
import tags from "../../resources/preloadedData/tags";
import userStatus from "../../resources/preloadedData/userStatus";
import projectStatus from "../../resources/preloadedData/projectStatus";
import resourceTypes from "../../resources/preloadedData/resourceTypes";
import projects from "../../resources/preloadedData/projects";
import boards from "../../resources/preloadedData/boards";
import blogs from "../../resources/preloadedData/blogs";
import resources from "../../resources/preloadedData/resources";

import Role from "../models/Role";
import User from "../models/User";
import Tag from "../models/Tag";
import UserStatus from "../models/UserStatus";
import ProjectStatus from "../models/ProjectStatus";
import ResourceType from "../models/ResourceType";
import Project from "../models/Project";
import Board from "../models/Board";
import Blog from "../models/Blog";
import Resource from "../models/Resource";

export default async function preloadData() {
  console.log("Preloading entities.");

  await Role.bulkCreate(roles);
  await UserStatus.bulkCreate(userStatus);
  await User.bulkCreate(await users());
  await Tag.bulkCreate(tags);
  await ProjectStatus.bulkCreate(projectStatus);
  await Project.bulkCreate(projects);
  await ResourceType.bulkCreate(resourceTypes);
  await Board.bulkCreate(boards);
  await Blog.bulkCreate(blogs);
  await Resource.bulkCreate(resources);

  console.log("Entities preloaded successfully.");
}
