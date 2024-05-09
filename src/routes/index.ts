import { Router } from "express";
import { addressRouter } from "./address.routes";
import { travelerRouter } from "./traveler.routes";
import { companyRouter } from "./company.routes";

const routes = Router();

routes.use("/address", addressRouter);
routes.use("/traveler", travelerRouter);
routes.use("/company", companyRouter);

export { routes };
