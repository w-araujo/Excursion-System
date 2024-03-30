import { Router } from "express";
import { AddressController } from "../controllers/AddressController";
import { AddressValidation } from "../validations/AddressValidation";

const addressRouter = Router();
const addressController = new AddressController();
const addressValidation = new AddressValidation();

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Rotas relacionadas ao endereço dos usuários
 */

/**
 * @swagger
 * /address/create:
 *   post:
 *     tags: [Address]
 *     summary: Cria um novo endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: "Nome da Rua"
 *               city:
 *                 type: string
 *                 example: "Nome da Cidade"
 *               state:
 *                 type: string
 *                 example: "Nome do Estado"
 *               country:
 *                 type: string
 *                 example: "Nome do País"
 *               number:
 *                 type: string
 *                 example: "0000"
 *               zipCode:
 *                 type: string
 *                 example: "00000000"
 *     responses:
 *       201:
 *         description: Retorna o endereço cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 street:
 *                   example: "Nome da Rua"
 *                 city:
 *                   example: "Nome da Cidade"
 *                 state:
 *                   example: "Nome do Estado"
 *                 country:
 *                   example: "Nome do País"
 *                 number:
 *                   example: "0000"
 *                 zipCode:
 *                   example: "00000000"
 *       400:
 *         description: Caso de algum erro inesperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example:  "zipCode must be a `string`"
 */

addressRouter.post(
  "/create",
  addressValidation.create,
  addressController.create
);

/**
 * @swagger
 * /address/listAll:
 *   get:
 *     tags: [Address]
 *     summary: Lista todos os endereços
 *     description: Obtém a lista de todos os endereços cadastrados
 *     responses:
 *       200:
 *         description: Retorna a listagem de todos os endereços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *                   number:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *             example:
 *               - id: 1
 *                 street: Rua X
 *                 city: Pelotas
 *                 state: RS
 *                 country: Brasil
 *                 number: "0000"
 *                 zipCode: "00000000"
 *               - id: 2
 *                 street: Rua Y
 *                 city: Porto Alegre
 *                 state: RS
 *                 country: Brasil
 *                 number: "0000"
 *                 zipCode: "00000000"
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

addressRouter.get("/listAll", addressController.listAll);

/**
 * @swagger
 * /address/findById/{id}:
 *   get:
 *     tags: [Address]
 *     summary: Retorna um endereço pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço a ser retornado
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Retorna o endereço correspondente ao ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 street:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 country:
 *                   type: string
 *                 number:
 *                   type: string
 *                 zipCode:
 *                   type: string
 *       404:
 *         description: Endereço não encontrado para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Address not found!"
 */
addressRouter.get("/findById/:id", addressController.findById);

/**
 * @swagger
 * /address/update/{id}:
 *   patch:
 *     tags: [Address]
 *     summary: Atualiza parcialmente um endereço pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço a ser atualizado
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
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               number:
 *                 type: string
 *               zipCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Retorna o endereço atualizado"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 street:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 country:
 *                   type: string
 *                 number:
 *                   type: string
 *                 zipCode:
 *                   type: string
 *       404:
 *         description: "Endereço não encontrado para o ID fornecido"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Address not found!"
 */
addressRouter.patch("/update/:id", addressController.update);

/**
 * @swagger
 * /address/delete/{id}:
 *   delete:
 *     tags: [Address]
 *     summary: Exclui um endereço pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do endereço a ser excluído
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Address deleted successfully"
 *       404:
 *         description: Endereço não encontrado para o ID fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Address not found!"
 */
addressRouter.delete("/delete/:id", addressController.delete);

export { addressRouter };
