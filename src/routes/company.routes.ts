import { Router } from "express";
import { CompanyController } from "../controllers/CompanyController";
import { CompanyValidation } from "../validations/CompanyValidation";
import { upload } from "../config/upload";

const companyRouter = Router();
const companyController = new CompanyController();
const companyValidation = new CompanyValidation();

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Rotas relacionadas às empresas
 */

/**
 * @swagger
 * /company/create/{travelerId}:
 *   post:
 *     tags: [Company]
 *     summary: Cria uma nova empresa e associa a um viajante
 *     parameters:
 *       - in: path
 *         name: travelerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do viajante ao qual a empresa será associada
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Empresa A"
 *               cnpj:
 *                 type: string
 *                 example: "00000000000000"
 *               email:
 *                 type: string
 *                 example: "empresa@mail.com"
 *               image:
 *                 type: string
 *                 format: binary
 *               phone:
 *                 type: string
 *                 example: "00000000000"
 *               description:
 *                 type: string
 *                 example: "Empresa voltada para o ramo de viagens..."
 *     responses:
 *       201:
 *         description: Retorna o endereço cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Empresa A"
 *                 cnpj:
 *                   type: string
 *                   example: "00000000000000"
 *                 email:
 *                   type: string
 *                   example: "empresa@mail.com"
 *                 image:
 *                   type: string
 *                   example: "http://example.com"
 *                 phone:
 *                   type: string
 *                   example: "00000000000"
 *                 description:
 *                   type: string
 *                   example: "Empresa voltada para o ramo de viagens..."
 *       400:
 *         description: Caso de algum erro inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "name must be a `string`"
 */
companyRouter.post(
  "/create/:travelerId",
  upload.single("image"),
  companyValidation.create,
  companyController.create
);

/**
 * @swagger
 * /company/listAll:
 *   get:
 *     tags: [Company]
 *     summary: Lista todas as empresas
 *     description: Obtém a lista de todas as empresas cadastradas
 *     responses:
 *       200:
 *         description: Retorna a listagem de todas as empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   cnpj:
 *                     type: string
 *                   email:
 *                     type: string
 *                   image:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   description:
 *                     type: string
 *             example:
 *               - id: 1
 *                 name: João
 *                 cnpj: 00000000000001
 *                 email: joao@mail.com
 *                 image: http://example1.com
 *                 phone: 00000000000
 *                 description: Sobre a empresa X
 *               - id: 2
 *                 name: Maria
 *                 cnpj: 00000000000002
 *                 email: maria@mail.com
 *                 image: http://example2.com
 *                 phone: 00000000000
 *                 description: Sobre a empresa Y
 *       400:
 *         description: Caso de algum erro inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Mensagem do erro"
 */
companyRouter.get("/listAll", companyController.listAll);

/**
 * @swagger
 * /company/findById/{id}:
 *   get:
 *     tags: [Company]
 *     summary: Retorna uma empresa pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da empresa a ser retornada
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Retorna a empresa correspondente ao ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 cnpj:
 *                   type: string
 *                 email:
 *                   type: string
 *                 image:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Empresa não encontrada para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Company not found!"
 */
companyRouter.get("/findById/:id", companyController.findById);

/**
 * @swagger
 * /company/update/{id}:
 *   patch:
 *     tags: [Company]
 *     summary: Atualiza parcialmente uma empresa pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da empresa a ser atualizada
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: false
 *               cnpj:
 *                 type: string
 *                 required: false
 *               email:
 *                 type: string
 *                 required: false
 *               image:
 *                 type: string
 *                 format: binary
 *                 required: false
 *               phone:
 *                 type: string
 *                 required: false
 *               description:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Retorna a empresa atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 cnpj:
 *                   type: string
 *                 email:
 *                   type: string
 *                 image:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Empresa não encontrada para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Company not found!"
 */
companyRouter.patch(
  "/update/:id",
  upload.single("image"),
  companyValidation.update,
  companyController.update
);

/**
 * @swagger
 * /company/delete/{id}:
 *   delete:
 *     tags: [Company]
 *     summary: Exclui uma empresa pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da empresa a ser excluída
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Company deleted successfully"
 *       404:
 *         description: Empresa não encontrada para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Company not found!"
 */
companyRouter.delete("/delete/:id", companyController.delete);

export { companyRouter };
