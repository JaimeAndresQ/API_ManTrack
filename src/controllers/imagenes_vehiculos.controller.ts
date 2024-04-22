import { Request, Response } from 'express';
import {BlobServiceClient} from "@azure/storage-blob";
import * as dotenv from 'dotenv'

dotenv.config()


const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);


export const uploadImagenesVehiculo = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { placa_vehiculo } = req.body;
        console.log(req.file!)
        const { buffer } = req.file!;
        const containerClient = blobService.getContainerClient('vehiculos');

        await containerClient.getBlockBlobClient(`${placa_vehiculo}.jpg`).uploadData(buffer)
        res.status(200).json({ message: "Imagen subida con éxito" })
    } catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error('Error al traer las imagenes:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al SUBIR las imagenes', error });
    }
} 



export const getImagenesVehiculo = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { placa_vehiculo } = req.params;
        const containerClient = blobService.getContainerClient('vehiculos');
        res.header("Content-Type","image/jpg")
        const response = await containerClient.getBlockBlobClient(`${placa_vehiculo}.jpg`).downloadToBuffer()
        res.status(200).send(response);
    } catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error('Error al TRAER las imagenes:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al TRAER las imagenes', error });
    }
} 