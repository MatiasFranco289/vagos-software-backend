// This file imports differents arrays of entities following it's corresponding interfaces
// and preloads it
import { TESTING } from "../constants";

import roles from "../../resources/preloadedData/roles";
import users from "../../resources/preloadedData/users";
import tags from "../../resources/preloadedData/tags";
import userStatus from "../../resources/preloadedData/userStatus";

import Role from "../models/Role";
import User from "../models/User";
import Tag from "../models/Tag";
import UserStatus from "../models/UserStatus";

export default async function preloadData() {
  if (process.env.NODE_ENV !== TESTING) {
    console.log("Preloading entities.");

    await Role.bulkCreate(roles);
    await UserStatus.bulkCreate(userStatus);
    await User.bulkCreate(await users());
    await Tag.bulkCreate(tags);

    console.log("Entities preloaded successfully.");
  } else {
    console.log("Testing environment detected. Skipping entities preloading.");
  }
}
