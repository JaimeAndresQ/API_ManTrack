import express  from "express";
// import validateToken from "./validate_token";
import {getPlanesMantenimiento, newPlanMantenimiento } from "../controllers/plan_mantenimiento.controller";

const router = express.Router();

router.post('/newPlan', newPlanMantenimiento);
router.get('/getAll', getPlanesMantenimiento);

export default router;