import { Router } from "express";
import { addressRouter } from "./address.routes";
import { travelerRouter } from "./traveler.routes";

const routes = Router();

routes.use("/address", addressRouter);
routes.use("/traveler", travelerRouter);

export { routes };
