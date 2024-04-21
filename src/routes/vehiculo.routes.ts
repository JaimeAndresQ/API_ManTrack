import express  from "express";
import { getAllVehiculos, getVehiculoById, newVehiculo, updateVehiculo } from "../controllers/vehiculo.controller";
import validateToken from "./validate_token";


const router = express.Router();

router.post('/newVehiculo',validateToken, newVehiculo);
router.get('/vehiculo/:id_vehiculo',validateToken, getVehiculoById);
router.get('/getAll', validateToken, getAllVehiculos);
router.put('/updateVehiculo/:id_vehiculo', validateToken, updateVehiculo);

export default router;