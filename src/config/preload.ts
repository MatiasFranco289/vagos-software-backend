// This file imports differents arrays of entities following it's corresponding interfaces
// and preloads it
import { TESTING } from "../constants";

import roles from "../../resources/preloadedData/roles";
import users from "../../resources/preloadedData/users";

import Role from "../models/Role";
import User from "../models/User";

export default async function preloadData() {
  if (process.env.NODE_ENV !== TESTING) {
    console.log("Preloading entities.");

    await Role.bulkCreate(roles);
    await User.bulkCreate(await users());

    console.log("Entities preloaded successfully.");
  } else {
    console.log("Testing environment detected. Skipping entities preloading.");
  }
}
