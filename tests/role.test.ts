import request from "supertest";
import app from "../src/index";

describe("GET /api/role", () => {
  it("Should return the created roles", async () => {
    await request(app).post("/api/role").send({
      role_name: "ADMIN",
    });

    await request(app).post("/api/role").send({
      role_name: "USER",
    });

    const response = await request(app).get("/api/role");

    expect(response.status).toBe(201);

    expect(response.body.data[0].name).toMatch("ADIN");
    expect(response.body.data[1].name).toMatch("USER");
  });
});
