import { Request, Response } from "express";
import { AddressService } from "../services/AddressService";
import { Address } from "@prisma/client";
import {
  connectPrisma,
  disconnectPrisma,
} from "../prisma/utils/connectDisconnect";
import { WinstonLog } from "../logs/WinstonLog";

const addressService = new AddressService();
const logger = new WinstonLog("info", "address service");

class AddressController {
  async create(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/address/create) requisitada.");

      await connectPrisma();

      const data: Address = req.body;
      const address = await addressService.create(
        data.street,
        data.city,
        data.state,
        data.country,
        data.number,
        data.zipCode
      );
      return res.status(201).json(address);
    } catch (error) {
      logger.error("Erro ao criar o endereço | Rota -> (/address/create).");

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/address/listAll) requisitada.");

      await connectPrisma();

      const listAll = await addressService.listAll();
      return res.status(200).json(listAll);
    } catch (error) {
      logger.error(
        "Erro ao listar todos os endereços | Rota -> (/address/listAll)."
      );

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async findById(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/address/findById) requisitada.");

      await connectPrisma();

      const findById = await addressService.findById(Number(req.params.id));
      return res.status(200).json(findById);
    } catch (error) {
      logger.error(
        "Erro ao listar o endereço pelo ID | Rota -> (/address/findById)."
      );

      return res.status(404).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async update(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/address/update) requisitada.");

      await connectPrisma();

      const data: Address = req.body;
      const update = await addressService.update(
        Number(req.params.id),
        data.street,
        data.city,
        data.state,
        data.country,
        data.number,
        data.zipCode
      );
      return res.status(200).json(update);
    } catch (error) {
      logger.error("Erro ao atualizar o endereço | Rota -> (/address/update).");

      return res.status(400).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }

  async delete(req: Request, res: Response) {
    try {
      logger.info("Rota -> (/address/delete) requisitada.");

      await connectPrisma();

      await addressService.delete(Number(req.params.id));
      return res.status(200).json({ msg: "Address deleted successfully" });
    } catch (error) {
      logger.error("Erro ao deletar o endereço | Rota -> (/address/delete).");

      return res.status(404).json({ error: (error as Error).message });
    } finally {
      await disconnectPrisma();
    }
  }
}

export { AddressController };
