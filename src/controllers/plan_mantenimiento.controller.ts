import { Request, Response } from 'express';
import { plan_mantenimiento, plan_mantenimiento_tiene_mantenimiento, plan_mantenimiento_tiene_vehiculo } from '../models/plan_mantenimiento';
import { mantenimiento } from '../models/maintenance';
import { vehiculo } from '../models/vehicles.model';
import { Op } from 'sequelize';

export const newPlanMantenimiento = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        // Recibimos todos los atributos o datos específicos del plan de mantenimiento a registrar
        const { pl_nombre } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!pl_nombre) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' });
        }

        // Crear el nuevo plan de mantenimiento
        await plan_mantenimiento.create({
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

export const getAllPlanesMantenimiento = async (_req: Request, res: Response): Promise<Response | void> => {
    try {
        // Obtener todos los planes de mantenimiento con la información de vehículos y mantenimientos asociados
        const planesMantenimiento = await plan_mantenimiento.findAll({
            include: [
                {
                    model: plan_mantenimiento_tiene_vehiculo,
                    include: [
                        { model: vehiculo,
                            attributes: [
                                'id_vehiculo',
                                'veh_marca',
                                'veh_modelo',
                                'veh_linea',
                                'veh_color',
                                'veh_capacidad',
                                'veh_clase_vehiculo',
                                'veh_cilindraje',
                                'veh_tipo_combustible',
                                'veh_numero_motor',
                                'veh_numero_chasis',
                                'veh_vin',
                                'veh_ciudad_registro',
                                'veh_fecha_matricula'
                            ]
                         }
                    ]
                },
                {
                    model: plan_mantenimiento_tiene_mantenimiento,
                    include: [
                        { model: mantenimiento, 
                            attributes: [
                                'id_mantenimiento',
                                'man_tipo_mantenimiento',
                                'man_descripcion',
                                'man_duracion_estimada'
                            ]
                        }
                    ]
                }
            ]
        });

        // Si no se encontraron planes de mantenimiento, responder con un mensaje
        if (!planesMantenimiento) {
            return res.status(404).json({ msg: 'No se encontraron planes de mantenimiento' });
        }

        // Si se encontraron planes de mantenimiento, responder con los datos
        return res.status(200).json({ planesMantenimiento });

    } catch (error) {
        // Si ocurre un error, responder con un error 500
        console.error('Error al obtener los planes de mantenimiento:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al obtener los planes de mantenimiento', error });
    }
};


export const newMantenimiento = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        // Recibimos todos los atributos o datos específicos del plan de mantenimiento a registrar
        const { tipo_mantenimiento, descripcion, duracion_estimada, fk_id_categoria } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!tipo_mantenimiento || !descripcion || !duracion_estimada || !fk_id_categoria) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' });
        }

        // Crear el nuevo plan de mantenimiento
       await mantenimiento.create({
            man_tipo_mantenimiento: tipo_mantenimiento,
            man_descripcion: descripcion,
            man_duracion_estimada: duracion_estimada,
            fk_id_categoria: fk_id_categoria,
        });

        // Si todo va bien, respondemos con un mensaje de éxito
        return res.status(200).json({ msg: 'Nuevo mantenimiento registrado exitosamente' });

    } catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error('Error al registrar el mantenimiento:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al registrar el mantenimiento', error });
    }
};

export const asociarMantenimientoPlan = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        // Recibir el id del plan de mantenimiento y el id del mantenimiento para asociarlos
        const { id_mantenimiento, id_plan_mantenimiento } = req.body;

        // Validar que se proporcionen los IDs de mantenimiento y plan de mantenimiento
        if (!id_mantenimiento || !id_plan_mantenimiento) {
            return res.status(400).json({ msg: 'Se requieren los IDs de mantenimiento y plan de mantenimiento' });
        }

        const mantenimientoEncontrado = await mantenimiento.findByPk(id_mantenimiento);

        // Si no se encuentra el mantenimiento, responder con un mensaje de error
        if (!mantenimientoEncontrado) {
            return res.status(404).json({ msg: 'No se encontró el mantenimiento con el ID proporcionado' });
        }

        // Crear la asociación entre el mantenimiento y el plan de mantenimiento
        await plan_mantenimiento_tiene_mantenimiento.create({
            fk_id_mantenimiento: id_mantenimiento,
            fk_id_plan_mantenimiento: id_plan_mantenimiento
        });

        // Si se crea correctamente, responder con un mensaje de éxito
        return res.status(200).json({ msg: 'Mantenimiento asociado exitosamente al plan de mantenimiento' });

    } catch (error) {
        // Si ocurre un error, responder con un error 500
        console.error('Error al asociar el mantenimiento con el plan de mantenimiento:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al asociar el mantenimiento con el plan de mantenimiento', error });
    }
};


export const asociarVehiculoPlan = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        // Recibir el id del plan de mantenimiento para asociarlo con el id del vehiculo correspondiente
        const { id_vehiculo , id_plan_mantenimiento } = req.body;

        // Validar que se proporcionen los IDs de vehiculo y plan de mantenimiento
        if (!id_vehiculo || !id_plan_mantenimiento) {
            return res.status(400).json({ msg: 'Se requieren los IDs de vehiculo y plan de mantenimiento' });
        }

        // Buscar el vehiculo por su ID
        const vehiculoEncontrado = await vehiculo.findByPk(id_vehiculo);

        // Si no se encuentra el vehiculo, responder con un mensaje de error
        if (!vehiculoEncontrado) {
            return res.status(404).json({ msg: `No se encontró el vehiculo con placa ${id_vehiculo}` });
        }

        // Asociar el vehiculo con el plan de mantenimiento
        await plan_mantenimiento_tiene_vehiculo.create({ 
            fk_id_plan_mantenimiento: id_plan_mantenimiento,
            fk_id_vehiculo: id_vehiculo
        });

        // Si se actualiza correctamente, responder con un mensaje de éxito
        return res.status(200).json({ msg: 'Vehiculo asociado con éxito al plan de mantenimiento' });

    } catch (error) {
        // Si ocurre un error, responder con un error 500
        console.error('Error al asociar el vehiculo con el plan de mantenimiento:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al asociar el vehiculo con el plan de mantenimiento', error });
    }
};

export const getVehiculosNoAsociados = async (req: Request, res: Response): Promise<Response> => {

    //Traemos el id del plan de mantenimiento que queremos buscar
    const { id_plan_mantenimiento } = req.params; 
    
    try {
        // Obtener los IDs de los vehículos asociados al plan de mantenimiento dado
        const vehiculosAsociadosPromise = plan_mantenimiento_tiene_vehiculo.findAll({
            where: {
                fk_id_plan_mantenimiento: id_plan_mantenimiento
            },
            attributes: ['fk_id_vehiculo'] // Solo obtener los IDs de los vehículos asociados
        });

        const vehiculosAsociadosModels = await vehiculosAsociadosPromise;

        // Mapear los modelos de Sequelize a un array de IDs de vehículos asociados
        const vehiculosAsociados = vehiculosAsociadosModels.map((vehiculoAsociado: any) => vehiculoAsociado.fk_id_vehiculo);

        // Obtener los vehículos que no están asociados al plan de mantenimiento dado
        const vehiculosNoAsociados = await vehiculo.findAll({
            where: {
                id_vehiculo: {
                    [Op.notIn]: vehiculosAsociados // Filtrar los vehículos que no están en la lista de vehículos asociados
                }
            }
        });

        return res.status(200).json({ vehiculosNoAsociados });
    } catch (error) {
        console.error('Error al obtener los vehículos no asociados:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al obtener los vehículos no asociados', error });
    }
};



export const getMantenimientosNoAsociados = async (req: Request, res: Response): Promise<Response> => {

    //Traemos el id del plan de mantenimiento que queremos buscar
    const { id_plan_mantenimiento } = req.params; 
    
    try {
        // Obtener los IDs de los mantenimientos asociados al plan de mantenimiento dado
        const mantenimientoNoAsociados = plan_mantenimiento_tiene_mantenimiento.findAll({
            where: {
                fk_id_plan_mantenimiento: id_plan_mantenimiento
            },
            attributes: ['fk_id_mantenimiento'] // Solo obtener los IDs de los mantenimientos asociados
        });

        const MantenimientosAsociadosModels = await mantenimientoNoAsociados;

        // Mapear los modelos de Sequelize a un array de IDs de mantenimientos asociados
        const MantenimientosAsociados = MantenimientosAsociadosModels.map((mantenimientoAsociado: any) => mantenimientoAsociado.fk_id_mantenimiento);

        // Obtener los mantenimientos que no están asociados al plan de mantenimiento dado
        const mantenimientosNoAsociados = await mantenimiento.findAll({
            where: {
                id_mantenimiento: {
                    [Op.notIn]: MantenimientosAsociados // Filtrar los vehículos que no están en la lista de vehículos asociados
                }
            }
        });

        return res.status(200).json({ mantenimientosNoAsociados });
    } catch (error) {
        console.error('Error al obtener los mantenimientos no asociados:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al obtener los mantenimientos no asociados', error });
    }
};
