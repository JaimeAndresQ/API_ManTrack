import { Request, Response } from 'express'
import { vehiculo } from '../models/vehicles.model'


export const newVehiculo = async (req: Request, res: Response): Promise<Response | void> => {

    try {
        //Recibimos todos los atributos o datos especificos del vehiculo a registrar
        const {
            id_vehiculo, marca, modelo, linea, color, capacidad,
            clase_vehiculo, cilindraje, tipo_combustible, numero_motor,
            numero_chasis, vin, ciudad_registro, fecha_matricula
        } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!id_vehiculo || !marca || !modelo || !linea || !color || !capacidad ||
            !clase_vehiculo || !cilindraje || !tipo_combustible || !numero_motor ||
            !numero_chasis || !vin || !ciudad_registro || !fecha_matricula) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' });
        }

        // Verificamos si el vehículo ya está registrado
        const vehiculoExistente = await vehiculo.findByPk(id_vehiculo);
        if (vehiculoExistente) {
            // Si el vehículo ya existe, respondemos con un error 400
            return res.status(409).json({ msg: `El vehículo con la placa ${id_vehiculo} ya se encuentra registrado` });
        }

        // Registramos el vehículo con los datos especificados por el usuario
        await vehiculo.create({
            id_vehiculo,
            veh_marca: marca,
            veh_modelo: modelo,
            veh_linea: linea,
            veh_color: color,
            veh_capacidad: capacidad,
            veh_clase_vehiculo: clase_vehiculo,
            veh_cilindraje: cilindraje,
            veh_tipo_combustible: tipo_combustible,
            veh_numero_motor: numero_motor,
            veh_numero_chasis: numero_chasis,
            veh_vin: vin,
            veh_ciudad_registro: ciudad_registro,
            veh_fecha_matricula: fecha_matricula
        });

        // Si todo va bien, respondemos con un mensaje de éxito
        res.status(200).json({ msg: `Vehículo con la placa ${id_vehiculo} registrado exitosamente` });
    } catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error('Error al registrar el vehículo:', error);
        res.status(500).json({ msg: 'Ups ocurrió un error al registrar el vehículo', error });
    }
};

//Método para consultar un vehiculo mediante su placa
export const getVehiculoById = async (req: Request, res: Response): Promise<Response | void> => {

    try {

        //Recibimos com parametro la placa del vehiculo
        const { id_vehiculo } = req.params

        // Validar que la placa del vehículo esté presente
        if (!id_vehiculo) {
            return res.status(400).json({ msg: 'La placa del vehículo es requerida' });
        }

        const vehiculoExistente = await vehiculo.findByPk(id_vehiculo);
        if (!vehiculoExistente) {
            return res.status(404).json({
                msg: `Vehiculo con la placa ${id_vehiculo} no encontrado`
            })
        }

        // Respuesta exitosa con el vehículo encontrado
        res.status(200).json(vehiculoExistente);


    } catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error(`Error al consultar el vehículo`, error);
        res.status(500).json({ msg: `Ups ocurrió un error al consultar el vehículo`, error });
    }
}

//Traer todos los vehiculos existentes 
export const getAllVehiculos = async (_req: Request, res: Response): Promise<Response | void> => {
    try {
        // Consultar todos los vehículos
        const vehiculos = await vehiculo.findAll({
            attributes: ['id_vehiculo', 'veh_marca', 'veh_modelo', 'veh_linea']
        });

        if (vehiculos.length > 0) {
            // Respuesta exitosa con los vehículos encontrados
            return res.status(200).json(vehiculos);
        }else {
            return res.status(404).json({
                msg: `No se encontraron vehículos`
            })
        }
        
    } catch (error) {
        // Si ocurre un error, responder con un error 500
        console.error('Error al consultar los vehículos:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al consultar los vehículos', error });
    }
};

export const updateVehiculo = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        // Recibimos el ID del vehículo a actualizar y los nuevos datos
        const { id_vehiculo } = req.params;
        const {
            marca, modelo, linea, color, capacidad,
            clase_vehiculo, cilindraje, tipo_combustible, numero_motor,
            numero_chasis, vin, ciudad_registro, fecha_matricula
        } = req.body;

        // Verificamos si el vehículo existe
        const vehiculoExistente = await vehiculo.findByPk(id_vehiculo);
        if (!vehiculoExistente) {
            return res.status(404).json({ msg: `El vehículo con placa ${id_vehiculo} no fue encontrado` });
        }

        // Actualizamos el vehículo con los nuevos datos
        await vehiculo.update({
            veh_marca: marca,
            veh_modelo: modelo,
            veh_linea: linea,
            veh_color: color,
            veh_capacidad: capacidad,
            veh_clase_vehiculo: clase_vehiculo,
            veh_cilindraje: cilindraje,
            veh_tipo_combustible: tipo_combustible,
            veh_numero_motor: numero_motor,
            veh_numero_chasis: numero_chasis,
            veh_vin: vin,
            veh_ciudad_registro: ciudad_registro,
            veh_fecha_matricula: fecha_matricula
        }, {
            where: { id_vehiculo: id_vehiculo }
        });

        // Si todo va bien, respondemos con un mensaje de éxito
        res.status(200).json({ msg: `Vehículo con placa ${id_vehiculo} actualizado exitosamente` });
    } catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error('Error al actualizar el vehículo:', error);
        res.status(500).json({ msg: 'Ups ocurrió un error al actualizar el vehículo', error });
    }
};