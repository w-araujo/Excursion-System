import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { WinstonLog } from "../logs/WinstonLog";

const logger = new WinstonLog("warn", "traveler service");

class TravelerValidation {
  async create(req: Request, res: Response, next: NextFunction) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      cpf: yup.string().min(11).required(),
      password: yup.string().min(5).required(),
      phone: yup.string().required(),
      birthdate: yup.date().required(),
      addressId: yup.number(),
      companyId: yup.number(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.error("Erro ao criar o traveler | Validação -> (traveler).");

      return res.status(400).json({ error: (error as Error).message });
    }

    return next();
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const schema = yup.object().shape({
      name: yup.string().notRequired(),
      email: yup.string().email().notRequired(),
      cpf: yup.string().min(11).notRequired(),
      password: yup.string().min(5).notRequired(),
      phone: yup.string().notRequired(),
      birthdate: yup.date().notRequired(),
      addressId: yup.number().notRequired(),
      companyId: yup.number().notRequired(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.error("Erro ao atualizar o traveler | Validação -> (traveler).");

      return res.status(400).json({ error: (error as Error).message });
    }

    return next();
  }
}

export { TravelerValidation };
