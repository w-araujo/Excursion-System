import { Request, Response } from "express";
import { TravelerService } from "../services/TravelerService";
import { Traveler } from "@prisma/client";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { WinstonLog } from "../logs/WinstonLog";

const travelerService = new TravelerService();
const logger = new WinstonLog("info", "traveler service");

class TravelerController {
  async create(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/traveler/create) requisitada.");

      await connectPrisma();

      const data: Traveler = req.body;
      const traveler = await travelerService.create(
        data.name,
        data.email,
        data.cpf,
        data.password,
        data.phone,
        data.birthdate,
        data.addressId,
        data.companyId
      );
      return res.status(201).json(traveler);
    } catch (error) {
      logger.error("Erro ao criar o traveler | Rota -> (/traveler/create).");

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async login(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/traveler/login) requisitada.");

      await connectPrisma();

      const data: Traveler = req.body;
      const traveler = await travelerService.login(data.email, data.password);
      return res.status(200).json(traveler);
    } catch (error) {
      logger.error("Erro ao logar no sistema | Rota -> (/traveler/login).");

      return res.status(401).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/traveler/listAll) requisitada.");

      await connectPrisma();

      const listAll = await travelerService.listAll();
      return res.status(200).json(listAll);
    } catch (error) {
      logger.error(
        "Erro ao listar todos os travelers | Rota -> (/traveler/listAll)."
      );

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async findById(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/traveler/findById) requisitada.");

      await connectPrisma();

      const findById = await travelerService.findById(Number(req.params.id));
      return res.status(200).json(findById);
    } catch (error) {
      logger.error(
        "Erro ao listar o traveler pelo ID | Rota -> (/traveler/findById)."
      );

      return res.status(404).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async update(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/traveler/update) requisitada.");

      await connectPrisma();

      const data: Traveler = req.body;
      const update = await travelerService.update(
        Number(req.params.id),
        data.name,
        data.email,
        data.cpf,
        data.password,
        data.phone,
        data.birthdate,
        data.addressId,
        data.companyId
      );
      return res.status(200).json(update);
    } catch (error) {
      logger.error(
        "Erro ao atualizar o traveler | Rota -> (/traveler/update)."
      );

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async delete(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/traveler/delete) requisitada.");

      await connectPrisma();

      await travelerService.delete(Number(req.params.id));
      return res.status(200).json({ msg: "Traveler deleted successfully" });
    } catch (error) {
      logger.error("Erro ao deletar o traveler | Rota -> (/traveler/delete).");

      return res.status(404).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }
}

export { TravelerController };
