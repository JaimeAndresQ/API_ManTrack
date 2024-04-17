import express  from "express";
import { getAllVehiculos, getVehiculoById, newVehiculo } from "../controllers/vehiculo.controller";
import validateToken from "./validate_token";


const router = express.Router();

router.post('/newVehiculo',validateToken, newVehiculo);
router.get('/vehiculo/:id_vehiculo',validateToken, getVehiculoById);
router.get('/getAll', getAllVehiculos);

export default router;