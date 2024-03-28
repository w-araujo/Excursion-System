import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { WinstonLog } from "../logs/WinstonLog";

const logger = new WinstonLog("warn", "address service");

class AddressValidation {
  async create(req: Request, res: Response, next: NextFunction) {
    const schema = yup.object().shape({
      street: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      country: yup.string().required(),
      number: yup.string().required(),
      zipCode: yup.string().required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.error("Erro ao criar o endereço | Validação -> (address).");

      return res.status(400).json({ error: (error as Error).message });
    }

    return next();
  }
}

export { AddressValidation };
