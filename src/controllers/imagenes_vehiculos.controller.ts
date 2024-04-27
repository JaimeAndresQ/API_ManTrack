import { Request, Response } from 'express';
import {BlobServiceClient} from "@azure/storage-blob";
import * as dotenv from 'dotenv'
import { Readable } from 'stream';

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
        const blobClient = await containerClient.getBlockBlobClient(`${placa_vehiculo}.jpg`)

        // Descargar la imagen como un stream
        const stream = await blobClient.download();

        // Verificar si el stream está definido antes de convertirlo a buffer
        if (!stream || !stream.readableStreamBody) {
            throw new Error('Stream is undefined or not readable');
        }

        // Assert the type of stream.readableStreamBody to Readable
        const readableStream = stream.readableStreamBody as Readable;

        const buffer = await streamToBuffer(readableStream);

        // Enviar el buffer como respuesta con el tipo de contenido adecuado
        res.setHeader('Content-Type', 'image/jpeg');
        return res.status(200).send(buffer);
    } catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error('Error al TRAER las imagenes:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al TRAER las imagenes', error });
    }
} 

async function streamToBuffer(stream: Readable): Promise<Buffer> {
    let chunks: Uint8Array[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }
