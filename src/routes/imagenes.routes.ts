import { Router } from "express";
import multer from "multer";
import { getImagenesVehiculo, uploadImagenesVehiculo } from "../controllers/imagenes_vehiculos.controller";
import { getImagenesUsuario, uploadImagenesUsuario } from "../controllers/imagenes_usuarios.controller";
import validateToken from "./validate_token";

const multerStorage = multer.memoryStorage()
const upload = multer({storage: multerStorage});

const router = Router();

/**
 * @openapi
 * /api/imagenes/uploadVehiculos:
 *   post:
 *     tags:
 *       - Imagenes - vehiculo
 *     summary: Subir imagen de vehículo
 *     description: Sube una imagen para el vehículo especificado.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Archivo de imagen a subir
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Imagen subida con éxito
 *       '500':
 *         description: Error interno del servidor
 */

router.post('/uploadVehiculos',validateToken, upload.single("file"), uploadImagenesVehiculo)



/**
 * @openapi
 * /api/imagenes/vehiculo/{placa_vehiculo}:
 *   get:
 *     tags:
 *       - Imagenes - vehiculo
 *     summary: Obtener imagen de vehículo
 *     description: Obtiene la imagen del vehículo especificado por placa.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: placa_vehiculo
 *         schema:
 *           type: string
 *         required: true
 *         description: Placa del vehículo del que se desea obtener la imagen
 *     responses:
 *       '200':
 *         description: Imagen obtenida con éxito
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       '500':
 *         description: Error interno del servidor
 */

router.get('/vehiculo/:placa_vehiculo',validateToken, upload.single("file"), getImagenesVehiculo)


/**
 * @openapi
 * /api/imagenes/uploadUsuario:
 *   post:
 *     tags:
 *       - Imagenes - usuario
 *     summary: Subir imagen de usuario
 *     description: Sube una imagen para el usuario especificado.
 *     requestBody:
 *       description: Archivo de imagen a subir
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Imagen subida con éxito
 *       '500':
 *         description: Error interno del servidor
 * */

router.post('/uploadUsuario', upload.single("file"), uploadImagenesUsuario)


/**
 * @openapi
 * /api/imagenes/usuario/{correo}:
 *   get:
 *     tags:
 *       - Imagenes - usuario
 *     summary: Obtener imagen de usuario
 *     description: Obtiene la imagen del usuario especificado por correo.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: correo
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo del usuario del que se desea obtener la imagen
 *     responses:
 *       '200':
 *         description: Imagen obtenida con éxito
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/usuario/:correo',validateToken, upload.single("file"), getImagenesUsuario)


export default router;
