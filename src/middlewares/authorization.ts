import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt";
import { WinstonLog } from "../logs/WinstonLog";

const logger = new WinstonLog("info", "authorization Middleware");

function authorization(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token not found!");
  }

  const [, token] = authHeader.split(" ");

  try {
    logger.info("Middleware -> (authorizarion) requisitado.");
    const decoded = decode(token);

    next();
    return decoded;
  } catch (error) {
    logger.error(
      "Erro na autorização do sistema | Middleware -> (authorization)."
    );
    return res.status(401).json({ error: (error as Error).message });
  }
}

export { authorization };
