import app from "./app";

import dotenv from "dotenv";
dotenv.config();

app.listen(process.env.API_PORT, () =>
  console.log(`Server Running on port ${process.env.API_PORT}`)
);
