import { Router } from "express";
import multer from "multer";
import { getImagenesVehiculo, uploadImagenesVehiculo } from "../controllers/imagenes_vehiculos.controller";
import { getImagenesUsuario, uploadImagenesUsuario } from "../controllers/imagenes_usuarios.controller";

const multerStorage = multer.memoryStorage()
const upload = multer({storage: multerStorage});

const router = Router();

router.post('/uploadVehiculos', upload.single("file"), uploadImagenesVehiculo)
router.get('/vehiculo/:placa_vehiculo', upload.single("file"), getImagenesVehiculo)

router.post('/uploadUsuario', upload.single("file"), uploadImagenesUsuario)
router.get('/usuario/:correo', upload.single("file"), getImagenesUsuario)


export default router;
