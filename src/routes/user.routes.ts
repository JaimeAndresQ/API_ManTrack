import express  from "express";
import { loginUser, registerUser } from "../controllers/user.controller";

const router = express.Router();
/**
 * Post track
 * @openapi
 * /api/users/newUser:
 *   post:
 *     tags:
 *       - usuario
 *     summary: Registro de usuario
 *     description: Este método permite al usuario registrarse dentro de la base de datos
 *     requestBody:
 *       description: Registro de un nuevo usuario
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuario'
 *     responses:
 *       '200':
 *         description: "Retorna un mensaje: Usuario con el correo especificado creado exitosamente"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuario'          
 *       '400':
 *         description: "Retorna un mensaje: Por favor, proporciona todos los campos requeridos"
 *       '409':
 *         description: "Retorna un mensaje: Ya existe un usuario con el correo suministrado o el usuario se encuentra inactivo"
 *       '500':
 *         description: "Es un error dentro del servidor y retorna el respectivo error"
 *     security:
 *       - bearerAuth: []
 */
router.post('/newUser', registerUser);
router.post('/user', loginUser)

export default router;
