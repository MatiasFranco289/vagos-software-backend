import sequelize from "./src/config/dbConnection";
import startServer from "./src/config/server";
import { encryptPassword } from "./src/utils";
import Role from "./src/models/Role";
import UserStatus from "./src/models/UserStatus";
import User from "./src/models/User";
import app from "./src/index";
import request from "supertest";

let server;

beforeAll(async () => {
  server = await startServer();

  // It is necessary to create a user and log in using it
  // to get an access token
  const userPassword = "test";
  const encryptedPassword = await encryptPassword(userPassword);

  const userRole = await Role.create({
    id: 1,
    name: "ADMIN",
  });

  const userStatus = await UserStatus.create({
    id: 1,
    name: "ACTIVE",
  });

  const user = await User.create({
    id: 1,
    username: "test",
    email: "test@gmail.com",
    password: encryptedPassword,
    roleId: userRole.id,
    statusId: userStatus.id,
  });

  const authResponse = await request(app).post("/api/auth/login").send({
    username: user.username,
    password: userPassword,
  });

  const cookies = authResponse.headers["set-cookie"];
  global.accessToken = cookies[0].split(";")[0];
});

afterAll(async () => {
  await server.close();
  await sequelize.close();
});
