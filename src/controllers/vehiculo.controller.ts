import { Request, Response } from 'express'
import { vehiculo } from '../models/vehicles.model'


export const newVehiculo = async (req: Request, res: Response) => {

    //Recibimos todos los atributos o datos especificos del vehiculo a registrar
    const { id_vehiculo, marca, modelo, linea, color, capacidad, clase_vehiculo, cilindraje, tipo_combustible, numero_motor, numero_chasis, vin, ciudad_registro, fecha_matricula } = req.body

    try {
        // Verificamos si el vehículo ya está registrado
        const vehiculoExistente = await vehiculo.findByPk(id_vehiculo);
        if (vehiculoExistente) {
            // Si el vehículo ya existe, respondemos con un error 400
            res.status(400).json({ msg: `El vehículo con la placa ${id_vehiculo} ya se encuentra registrado` });
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
export const getVehiculoById = async (req: Request, res:Response) => {
    //Recibimos com parametro la placa del vehiculo
    const {id_vehiculo} = req.params

    try{

        const vehiculoExistente = await vehiculo.findByPk(id_vehiculo);
        if(!vehiculoExistente){
            res.status(404).json({
                msg: `Vehiculo con la placa ${id_vehiculo} no encontrado`
            })
        }

        res.status(200).json(vehiculoExistente);


    }catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error(`Error al consultar el vehículo de placa ${id_vehiculo}:`, error);
        res.status(500).json({ msg: `Ups ocurrió un error al consultar el vehículo de placa ${id_vehiculo}`, error });
    }
}