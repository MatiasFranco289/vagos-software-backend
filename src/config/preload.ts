// This file imports differents arrays of entities following it's corresponding interfaces
// if you are in development environment they will be pre loaded
import { DEVELOPMENT } from "../constants";

import roles from "../../resources/preloadedData/roles";
import users from "../../resources/preloadedData/users";

import Role from "../models/Role";
import User from "../models/User";

export default async function preloadData() {
  if (process.env.NODE_ENV === DEVELOPMENT) {
    console.log("Development environment detected. Preloading entities.");

    await Role.bulkCreate(roles);
    await User.bulkCreate(await users());

    console.log("Entities preloaded successfully.");
  } else {
    console.log(
      "Non development environment detected. Skipping entities preloading."
    );
  }
}
