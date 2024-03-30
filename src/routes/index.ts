import { Router } from "express";
import { addressRouter } from "./address.routes";

const routes = Router();

routes.use("/address", addressRouter);

export { routes };
