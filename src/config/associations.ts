import User from "../models/User";
import Role from "../models/Role";

export default async function createAssociations() {
  User.belongsTo(Role, {
    foreignKey: "roleId",
    as: "role",
  });

  Role.hasMany(User, {
    foreignKey: "roleId",
    as: "users",
  });
}
