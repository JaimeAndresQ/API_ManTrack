import { Request, Response } from 'express';
import { plan_mantenimiento } from '../models/plan_mantenimiento';
import { mantenimiento } from '../models/maintenance';
import { vehiculo } from '../models/vehicles.model';

export const newPlanMantenimiento = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        // Recibimos todos los atributos o datos específicos del plan de mantenimiento a registrar
        const { fk_id_vehiculo, fk_id_mantenimiento, pl_nombre } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!fk_id_vehiculo || !fk_id_mantenimiento || !pl_nombre) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' });
        }

        // Verificar si el plan de mantenimiento ya está registrado
        const planExistente = await plan_mantenimiento.findOne({
            where: {
                fk_id_vehiculo: fk_id_vehiculo,
                fk_id_mantenimiento: fk_id_mantenimiento,
            }
        });

        if (planExistente) {
            // Si el plan de mantenimiento ya existe para el vehículo, respondemos con un error 409
            return res.status(409).json({ msg: 'Este plan de mantenimiento ya está asignado para este vehículo' });
        }

        // Crear el nuevo plan de mantenimiento
        await plan_mantenimiento.create({
            fk_id_vehiculo,
            fk_id_mantenimiento,
            pl_nombre
        });

        // Si todo va bien, respondemos con un mensaje de éxito
        return res.status(200).json({ msg: 'Nuevo plan de mantenimiento registrado exitosamente' });

    } catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error('Error al registrar el plan de mantenimiento:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al registrar el plan de mantenimiento', error });
    }
};

export const getPlanesMantenimiento = async (_req: Request, res: Response): Promise<Response | void> => {
    try {
     

        // Buscar todos los registros en la tabla plan_mantenimiento que correspondan a la placa del vehículo
        const planesMantenimiento = await plan_mantenimiento.findAll({
        
            include: [
                    { model: mantenimiento }, // Incluir información del mantenimiento
                    { model: vehiculo }, // Incluir información del vehículo
                  ],
        });

        // Si no se encuentran registros, devolvemos un mensaje 404
        if (planesMantenimiento.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron mantenimientos para este vehículo' });
        }

        // Si se encuentran registros, respondemos con los datos
        return res.status(200).json({ planesMantenimiento });

    } catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error('Error al obtener los mantenimientos del vehículo:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al obtener los mantenimientos del vehículo', error });
    }
};