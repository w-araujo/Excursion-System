import express, { Request, Response } from "express";
import { routes } from "./routes/index";

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Hello World!" });
});

export { app };
