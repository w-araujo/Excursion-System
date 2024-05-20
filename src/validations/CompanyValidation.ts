import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { WinstonLog } from "../logs/WinstonLog";

const logger = new WinstonLog("warn", "company service");

class CompanyValidation {
  async create(req: Request, res: Response, next: NextFunction) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      cnpj: yup.string().notRequired(),
      email: yup.string().email().required(),
      image: yup.string().notRequired(),
      phone: yup.string().min(11).required(),
      description: yup.string().required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.error("Erro ao criar a empresa | Validação -> (company).");

      return res.status(400).json({ error: (error as Error).message });
    }

    return next();
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const schema = yup.object().shape({
      name: yup.string().notRequired(),
      cnpj: yup.string().notRequired(),
      email: yup.string().email().notRequired(),
      image: yup.string().notRequired(),
      phone: yup.string().notRequired(),
      description: yup.string().notRequired(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      logger.error("Erro ao atualizar a empresa | Validação -> (company).");

      return res.status(400).json({ error: (error as Error).message });
    }

    return next();
  }
}

export { CompanyValidation };
