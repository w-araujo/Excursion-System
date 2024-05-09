import { Request, Response } from "express";
import { CompanyService } from "../services/CompanyService";
import { Company } from "@prisma/client";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { WinstonLog } from "../logs/WinstonLog";

const companyService = new CompanyService();
const logger = new WinstonLog("info", "company service");

class CompanyController {
  async create(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/company/create) requisitada.");

      await connectPrisma();

      const data: Company = req.body;
      const travelerId = req.params.travelerId;
      let imageurl;

      if (req.file) {
        imageurl = req.file.path;
      }

      const company = await companyService.create(
        data.name,
        data.cnpj,
        data.email,
        imageurl,
        data.phone,
        data.description,
        Number(travelerId)
      );
      return res.status(201).json(company);
    } catch (error) {
      logger.error("Erro ao criar a empresa | Rota -> (/company/create).");

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/company/listAll) requisitada.");

      await connectPrisma();

      const listAll = await companyService.listAll();
      return res.status(200).json(listAll);
    } catch (error) {
      logger.error(
        "Erro ao listar todas as empresas | Rota -> (/company/listAll)."
      );

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async findById(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/company/findById) requisitada.");

      await connectPrisma();

      const findById = await companyService.findById(Number(req.params.id));
      return res.status(200).json(findById);
    } catch (error) {
      logger.error(
        "Erro ao listar a empresa pelo ID | Rota -> (/company/findById)."
      );

      return res.status(404).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async update(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/company/update) requisitada.");

      await connectPrisma();

      const data: Company = req.body;
      let imageurl;

      if (req.file) {
        imageurl = req.file.path;
      }

      const update = await companyService.update(
        Number(req.params.id),
        data.name,
        data.cnpj,
        data.email,
        imageurl,
        data.phone,
        data.description
      );
      return res.status(200).json(update);
    } catch (error) {
      logger.error("Erro ao atualizar a empresa | Rota -> (/company/update).");

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async delete(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/company/delete) requisitada.");

      await connectPrisma();

      await companyService.delete(Number(req.params.id));
      return res.status(200).json({ msg: "Company deleted successfully" });
    } catch (error) {
      logger.error("Erro ao deletar a empresa | Rota -> (/company/delete).");

      return res.status(404).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }
}

export { CompanyController };
