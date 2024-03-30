import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Excursion-System api",
      version: "1.0.0",
      description: "Documentação da API",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Meu portifólio",
        url: "https://wesleyfa.dev",
      },
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Development server",
      },
      {
        url: "http://api.example.prod.com",
        description: "Production server",
      },
    ],
  },
  apis: ["*/routes/**.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec };
