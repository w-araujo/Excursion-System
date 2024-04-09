import { Router } from "express";
import { TravelerController } from "../controllers/TravelerController";
import { TravelerValidation } from "../validations/TravelerValidation";

const travelerRouter = Router();
const travelerController = new TravelerController();
const travelerValidation = new TravelerValidation();

/**
 * @swagger
 * tags:
 *   name: Traveler
 *   description: Rotas relacionadas aos viajantes
 */

/**
 * @swagger
 * /traveler/create:
 *   post:
 *     tags: [Traveler]
 *     summary: Cria um novo viajante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fulano"
 *               email:
 *                 type: string
 *                 example: "fulano@mail.com"
 *               cpf:
 *                 type: string
 *                 example: "00000000000"
 *               password:
 *                 type: string
 *                 example: "12345"
 *               phone:
 *                 type: string
 *                 example: "00000000000"
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: "00000000"
 *     responses:
 *       201:
 *         description: Retorna o endereço cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               name:
 *                 type: string
 *                 example: "Fulano"
 *               email:
 *                 type: string
 *                 example: "fulano@mail.com"
 *               cpf:
 *                 type: string
 *                 example: "00000000000"
 *               password:
 *                 type: string
 *                 example: "12345"
 *               phone:
 *                 type: string
 *                 example: "00000000000"
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: "00000000"
 *               companyId:
 *                 type: number
 *                 example: null
 *               addressId:
 *                 type: number
 *                 example: null
 *       400:
 *         description: Caso de algum erro inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example:  "name must be a `string`"
 */
travelerRouter.post(
  "/create",
  travelerValidation.create,
  travelerController.create
);

/**
 * @swagger
 * /traveler/login:
 *   post:
 *     tags: [Traveler]
 *     summary: Faz login do viajante no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "fulano@mail.com"
 *               password:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Retorna o token e os dados do viajante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                 type: string
 *                 example: "00000000000000000000000000000000"
 *                name:
 *                 type: string
 *                 example: "Fulano"
 *                email:
 *                 type: string
 *                 example: "fulano@mail.com"
 *                cpf:
 *                 type: string
 *                 example: "00000000000"
 *                password:
 *                 type: string
 *                 example: "12345"
 *                phone:
 *                 type: string
 *                 example: "00000000000"
 *                birthdate:
 *                 type: string
 *                 format: date
 *                 example: "00000000"
 *                companyId:
 *                 type: number
 *                 example: null
 *                addressId:
 *                 type: number
 *                 example: null
 *       401:
 *         description: Caso de falha no token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example:  "Incorrect email/password combination"
 */
travelerRouter.post(
  "/login",
  travelerValidation.login,
  travelerController.login
);

/**
 * @swagger
 * /traveler/listAll:
 *   get:
 *     tags: [Traveler]
 *     summary: Lista todos os viajantes
 *     description: Obtém a lista de todos os viajantes cadastrados
 *     responses:
 *       200:
 *         description: Retorna a listagem de todos os viajantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *               password:
 *                 type: string
 *                 example: "12345"
 *               phone:
 *                 type: string
 *               birthdate:
 *                   type: string
 *                   format: date
 *               companyId:
 *                 type: number
 *               addressId:
 *                 type: number
 *             example:
 *               - id: 1
 *                 name: João
 *                 email: joao@mail.com
 *                 cpf: 00000000000
 *                 password: 12345
 *                 phone: 00000000000
 *                 birthdate: 06101985
 *                 companyId: null
 *                 addressId: 1
 *               - id: 2
 *                 name: Maria
 *                 email: maria@mail.com
 *                 cpf: 00000000000
 *                 password: 12345
 *                 phone: 00000000000
 *                 birthdate: 22041990
 *                 companyId: null
 *                 addressId: null
 *       400:
 *         description: Caso de algum erro inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example:  "Mensagem do erro"
 */
travelerRouter.get("/listAll", travelerController.listAll);

/**
 * @swagger
 * /traveler/findById/{id}:
 *   get:
 *     tags: [Traveler]
 *     summary: Retorna um viajante pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do viajante a ser retornado
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Retorna o viajante correspondente ao ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 password:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                 companyId:
 *                   type: number
 *                 addressId:
 *                   type: number
 *       404:
 *         description: Viajante não encontrado para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Traveler not found!"
 */
travelerRouter.get("/findById/:id", travelerController.findById);

/**
 * @swagger
 * /traveler/update/{id}:
 *   patch:
 *     tags: [Traveler]
 *     summary: Atualiza parcialmente um viajante pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do viajante a ser atualizado
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 password:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                 companyId:
 *                   type: number
 *                 addressId:
 *                   type: number
 *     responses:
 *       200:
 *         description: "Retorna o viajante atualizado"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 password:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                 companyId:
 *                   type: number
 *                 addressId:
 *                   type: number
 *       404:
 *         description: "Viajante não encontrado para o ID fornecido"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Traveler not found!"
 */
travelerRouter.patch(
  "/update/:id",
  travelerValidation.update,
  travelerController.update
);

/**
 * @swagger
 * /traveler/delete/{id}:
 *   delete:
 *     tags: [Traveler]
 *     summary: Exclui um viajante pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do viajante a ser excluído
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Traveler deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Traveler deleted successfully"
 *       404:
 *         description: Viajante não encontrado para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Traveler not found!"
 */
travelerRouter.delete("/delete/:id", travelerController.delete);

export { travelerRouter };
