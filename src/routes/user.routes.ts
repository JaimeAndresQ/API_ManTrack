import express  from "express";
import { loginUser, registerUser } from "../controllers/user.controller";

const router = express.Router();
/**
 * @openapi
 * /api/users/newUser:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Registrar nuevo usuario
 *     description: Registra un nuevo usuario en la base de datos.
 *     requestBody:
 *       description: Datos del nuevo usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuarioRegistro'
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente
 *       '400':
 *         description: Error en la solicitud o falta de campos requeridos
 *       '409':
 *         description: Ya existe un usuario con el correo especificado o el número de identificación proporcionado
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/newUser', registerUser);

/**
 * @openapi
 * /api/users/user:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Iniciar sesión
 *     description: Inicia sesión de usuario, validando las credenciales en la base de datos.
 *     requestBody:
 *       description: Datos de inicio de sesión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuarioLogin'
 *     responses:
 *       '200':
 *         description: Token de inicio de sesión generado exitosamente
 *       '400':
 *         description: Error en la solicitud o falta de campos requeridos
 *       '404':
 *         description: No existe un usuario con el correo especificado en la base de datos o no se encuentra activo
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/user', loginUser)

export default router;
