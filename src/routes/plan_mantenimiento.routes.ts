import express from "express";
import validateToken from "./validate_token";
import { asociarMantenimientoPlan, asociarVehiculoPlan, getAllPlanesMantenimiento, getVehiculosNoAsociados, newMantenimiento, newPlanMantenimiento } from "../controllers/plan_mantenimiento.controller";

const router = express.Router();

router.post('/newPlan',validateToken, newPlanMantenimiento);
router.get('/getAll',validateToken, getAllPlanesMantenimiento);
router.post('/newMantenimiento',validateToken, newMantenimiento);
router.put('/mantenimiento/updatePlan',validateToken, asociarMantenimientoPlan);
router.put('/vehiculo/updatePlan',validateToken, asociarVehiculoPlan);
router.get('/vehiculosNoAsociados/:id_plan_mantenimiento',validateToken, getVehiculosNoAsociados)

export default router;