import express from "express";
import validateToken from "./validate_token";
import { asociarMantenimientoPlan, asociarVehiculoPlan, eliminarMantenimientoPlan, eliminarVehiculoPlan, getAllPlanesMantenimiento, getMantenimientosNoAsociados, getVehiculosNoAsociados, newMantenimiento, newPlanMantenimiento } from "../controllers/plan_mantenimiento.controller";

const router = express.Router();

/**
 * @openapi
 * /api/planesMantenimientos/newPlan:
 *   post:
 *     tags:
 *       - Planes de Mantenimiento
 *     summary: Crear nuevo plan de mantenimiento
 *     description: Crea un nuevo plan de mantenimiento en la base de datos.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Datos del nuevo plan de mantenimiento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pl_nombre:
 *                 type: string
 *               fecha_realizacion:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Plan de mantenimiento creado exitosamente
 *       '400':
 *         description: Error en la solicitud o falta de campos requeridos
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/newPlan',validateToken, newPlanMantenimiento);

/**
 * @openapi
 * /api/planesMantenimientos/getAll:
 *   get:
 *     tags:
 *       - Planes de Mantenimiento
 *     summary: Obtener todos los planes de mantenimiento
 *     description: Obtiene todos los planes de mantenimiento almacenados en la base de datos.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Planes de mantenimiento obtenidos exitosamente
 *       '404':
 *         description: No se encontraron planes de mantenimiento
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/getAll', getAllPlanesMantenimiento);

/**
 * @openapi
 * /api/planesMantenimientos/newMantenimiento:
 *   post:
 *     tags:
 *       - Planes de Mantenimiento
 *     summary: Crear nuevo mantenimiento
 *     description: Crea un nuevo registro de mantenimiento en la base de datos.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Datos del nuevo mantenimiento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/mantenimiento'
 *     responses:
 *       '200':
 *         description: Mantenimiento creado exitosamente
 *       '400':
 *         description: Error en la solicitud o falta de campos requeridos
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/newMantenimiento',validateToken, newMantenimiento);

/**
 * @openapi
 * /api/planesMantenimientos/mantenimiento/updatePlan:
 *   put:
 *     tags:
 *       - Planes de Mantenimiento
 *     summary: Asociar mantenimiento a plan de mantenimiento
 *     description: Asocia un mantenimiento existente a un plan de mantenimiento existente.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: IDs del mantenimiento y plan de mantenimiento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_mantenimiento:
 *                 type: integer
 *               id_plan_mantenimiento:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Mantenimiento asociado exitosamente al plan de mantenimiento
 *       '400':
 *         description: Error en la solicitud o falta de IDs de mantenimiento y plan de mantenimiento
 *       '404':
 *         description: No se encontró el mantenimiento con el ID proporcionado
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/mantenimiento/updatePlan',validateToken, asociarMantenimientoPlan);

/**
 * @openapi
 * /api/planesMantenimiento/vehiculo/updatePlan:
 *   put:
 *     tags:
 *       - Planes de Mantenimiento
 *     summary: Asociar vehículo a plan de mantenimiento
 *     description: Asocia un vehículo existente a un plan de mantenimiento existente.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: IDs del vehículo y plan de mantenimiento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_vehiculo:
 *                 type: string
 *               id_plan_mantenimiento:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Vehículo asociado exitosamente al plan de mantenimiento
 *       '400':
 *         description: Error en la solicitud o falta de IDs de vehículo y plan de mantenimiento
 *       '404':
 *         description: No se encontró el vehículo con el ID proporcionado
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/vehiculo/updatePlan',validateToken, asociarVehiculoPlan);

/**
 * @openapi
 * /api/planesMantenimiento/vehiculosNoAsociados/{id_plan_mantenimiento}:
 *   get:
 *     tags:
 *       - Planes de Mantenimiento
 *     summary: Obtener vehículos no asociados a un plan de mantenimiento
 *     description: Obtiene los vehículos que aún no están asociados a un plan de mantenimiento específico.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_plan_mantenimiento
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del plan de mantenimiento del que se desean obtener los vehículos no asociados
 *     responses:
 *       '200':
 *         description: Vehículos no asociados obtenidos exitosamente
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/vehiculosNoAsociados/:id_plan_mantenimiento',validateToken, getVehiculosNoAsociados)

/**
 * @openapi
 * /api/planesMantenimiento/mantenientosNoAsociados/{id_plan_mantenimiento}:
 *   get:
 *     tags:
 *       - Planes de Mantenimiento
 *     summary: Obtener mantenimientos no asociados a un plan de mantenimiento
 *     description: Obtiene los mantenimientos que aún no están asociados a un plan de mantenimiento específico.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_plan_mantenimiento
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del plan de mantenimiento del que se desean obtener los mantenimientos no asociados
 *     responses:
 *       '200':
 *         description: Mantenimientos no asociados obtenidos exitosamente
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/mantenientosNoAsociados/:id_plan_mantenimiento', getMantenimientosNoAsociados)

/**
 * @openapi
 * /api/planesMantenimientos/eliminarMantenimiento:
 *   delete:
 *     tags:
 *       - Planes de Mantenimiento
 *     summary: Eliminar mantenimiento de un plan de mantenimiento
 *     description:  Elimina un mantenimiento de un plan de mantenimiento específico.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Datos de la consulta.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_mantenimiento:
 *                 type: integer
 *                 description: ID del mantenimiento a eliminar del plan de mantenimiento
 *               id_plan_mantenimiento:
 *                 type: integer
 *                 description: ID del plan de mantenimiento del cual eliminar el mantenimiento
 *     responses:
 *       '200':
 *         description: Mantenimiento eliminado con éxito del plan de mantenimiento
 *       '400':
 *         description: Se requieren los IDs de mantenimiento y plan de mantenimiento
 *       '404':
 *         description: No se encontró la asociación entre el mantenimiento y el plan de mantenimiento
 *       '500':
 *         description: Ups ocurrió un error al eliminar el mantenimiento del plan de mantenimiento
 */
router.delete('/eliminarMantenimiento', validateToken, eliminarMantenimientoPlan)


/**
 * @openapi
 * /api/planesMantenimientos/eliminarVehiculo:
 *   delete:
 *     tags:
 *       - Planes de Mantenimiento
 *     summary: Eliminar vehículo de un plan de mantenimiento
 *     description:  Elimina un vehículo de un plan de mantenimiento específico.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Datos de la consulta.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_vehiculo:
 *                 type: string
 *                 description: ID del vehículo a eliminar del plan de mantenimiento
 *               id_plan_mantenimiento:
 *                 type: integer
 *                 description: ID del plan de mantenimiento del cual eliminar el vehículo
 *     responses:
 *       '200':
 *         description: Vehículo eliminado con éxito del plan de mantenimiento
 *       '400':
 *         description: Se requieren los IDs de vehículo y plan de mantenimiento
 *       '404':
 *         description: No se encontró la asociación entre el vehículo y el plan de mantenimiento
 *       '500':
 *         description: Ups ocurrió un error al eliminar el vehículo del plan de mantenimiento
 */
router.delete('/eliminarVehiculo', validateToken, eliminarVehiculoPlan)

export default router;