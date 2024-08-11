import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const API_DOMAIN = process.env.API_DOMAIN;
const API_PORT = process.env.API_PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for Vagos Software backend.",
    },
    servers: [
      {
        url: `${API_DOMAIN}:${API_PORT}`,
        description: "Vagos Software API",
      },
    ],
  },
  apis: ["./src/swagger/**/*.ts"],
};

const specs = swaggerJsdoc(options);

const swaggerSetup = (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerSetup;
