import { Router } from "express";
import { AddressController } from "../controllers/AddressController";
import { AddressValidation } from "../validations/AddressValidation";

const addressRouter = Router();
const addressController = new AddressController();
const addressValidation = new AddressValidation();

addressRouter.post(
  "/create",
  addressValidation.create,
  addressController.create
);
addressRouter.get("/listAll", addressController.listAll);
addressRouter.get("/findById/:id", addressController.findById);
addressRouter.patch("/update/:id", addressController.update);
addressRouter.delete("/delete/:id", addressController.delete);

export { addressRouter };
