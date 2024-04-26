import { Router } from "express";
import multer from "multer";
import { getImagenesVehiculo, uploadImagenesVehiculo } from "../controllers/imagenes_vehiculos.controller";
import { getImagenesUsuario, uploadImagenesUsuario } from "../controllers/imagenes_usuarios.controller";
import validateToken from "./validate_token";

const multerStorage = multer.memoryStorage()
const upload = multer({storage: multerStorage});

const router = Router();

router.post('/uploadVehiculos',validateToken, upload.single("file"), uploadImagenesVehiculo)
router.get('/vehiculo/:placa_vehiculo',validateToken, upload.single("file"), getImagenesVehiculo)

router.post('/uploadUsuario',validateToken, upload.single("file"), uploadImagenesUsuario)
router.get('/usuario/:correo',validateToken, upload.single("file"), getImagenesUsuario)


export default router;
