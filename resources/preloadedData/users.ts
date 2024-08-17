import { encryptPassword } from "../../src/utils";
import { UserCreationAttributes } from "../../src/models/User";

async function users(): Promise<Array<UserCreationAttributes>> {
  return [
    {
      id: 1,
      username: "VagoDevTesting_1",
      email: "vagodevtesting1@gmail.com",
      password: await encryptPassword("test"),
      roleId: 1,
      statusId: 1,
    },
    {
      id: 2,
      username: "VagoDevTesting_2",
      email: "vagodevtesting2@gmail.com",
      password: await encryptPassword("test"),
      roleId: 1,
      statusId: 1,
    },
    {
      id: 3,
      username: "VagoUserTesting_1",
      email: "vagousertesting1@gmail.com",
      password: await encryptPassword("test"),
      roleId: 2,
      statusId: 1,
    },
  ];
}

export default users;
