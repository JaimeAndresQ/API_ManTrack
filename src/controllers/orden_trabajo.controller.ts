import { Request, Response } from 'express';
import { orden_trabajo } from '../models/orden_trabajo';
import { persona, usuario } from '../models/user.model';
import { vehiculo } from '../models/vehicles.model';
import moment from 'moment-timezone';

export const newOrdenTrabajo = async (req: Request, res: Response): Promise<Response | void> => {

    try {
        // Recibimos todos los atributos o datos específicos de la orden de trabajo a crear
        const { descripcion, tiempo_estimado, tipo_mantenimiento, fk_id_usuario_correo, fk_id_vehiculo, fk_id_categoria} = req.body;
        
        //Validar que se envien todos los parametros para crear una orden de trabajo
        if (!descripcion || !tiempo_estimado || !tipo_mantenimiento || !fk_id_usuario_correo || !fk_id_categoria) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' });
        }

        const usuarioExistente = await usuario.findByPk(fk_id_usuario_correo);
        const vehiculoExistente = await vehiculo.findByPk(fk_id_vehiculo);
        
        if(!usuarioExistente) {
            return res.status(404).json({ msg: 'El usuario al que se asocia la orden de trabajo no existe' });
        }

        if(!vehiculoExistente) {
            return res.status(404).json({ msg: 'El vehiculo al que se asocia la orden de trabajo no existe' });
        }

        const fechaActual = moment().tz('America/Bogota').format('YYYY-MM-DD');

         // Crear una nueva orden de trabjo
         await orden_trabajo.create({
            ord_descripcion: descripcion,
            ord_fecha_realizacion: fechaActual,
            ord_estado: 'P',
            ord_tiempo_estimado: tiempo_estimado,
            ord_tipo_mantenimiento: tipo_mantenimiento,
            fk_id_usuario_correo: fk_id_usuario_correo,
            fk_id_vehiculo: fk_id_vehiculo,
            fk_id_categoria: fk_id_categoria
        });

         // Si todoo va bien, respondemos con un mensaje de éxito
         return res.status(200).json({ msg: 'Nueva orden de trabajo creada exitosamente' });

    }catch (error) {
        // Si ocurre un error, respondemos con un error 500
        console.error('Error al crear una orden de trabajo:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al crear una orden de trabajo', error });
    }
}


export const updateFinalizarOrdenTrabajo = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Traer el id de la orden de trabajo a actualizar
        const { id_orden_trabajo } = req.params;
        //Traer los campos a actualizar
        const { observaciones, tiempo_ejecucion } = req.body; 

        // Verificar si la orden de trabajo existe
        const ordenTrabajoExistente = await orden_trabajo.findByPk(id_orden_trabajo);
        if (!ordenTrabajoExistente) {
            return res.status(404).json({ msg: 'La orden de trabajo no existe' });
        }

        // Actualizar los campos especificados
        await orden_trabajo.update(
            {
                ord_observaciones: observaciones,
                ord_tiempo_ejecucion: tiempo_ejecucion,
                ord_estado: 'R'
            },
            {
                where: { id_orden_trabajo: id_orden_trabajo }
            }
        );

        return res.status(200).json({ msg: 'Orden de trabajo actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la orden de trabajo:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al actualizar la orden de trabajo', error });
    }
}


export const updateAprobarOrdenTrabajo = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Traer el id de la orden de trabajo a actualizar
        const { id_orden_trabajo } = req.params;

        // Verificar si la orden de trabajo existe
        const ordenTrabajoExistente = await orden_trabajo.findByPk(id_orden_trabajo);
        if (!ordenTrabajoExistente) {
            return res.status(404).json({ msg: 'La orden de trabajo no existe' });
        }

        // Actualizar los campos especificados
        await orden_trabajo.update(
            {
                ord_estado: 'F'
            },
            {
                where: { id_orden_trabajo: id_orden_trabajo }
            }
        );

        return res.status(200).json({ msg: 'Orden de trabajo actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la orden de trabajo:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al actualizar la orden de trabajo', error });
    }
}

export const getOrdenesTrabajoByEstado = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { estado } = req.params; // Estado de la ordenes de trabajo a buscar

        // Verificar si se proporcionó el estado en la solicitud
        if (!estado) {
            return res.status(400).json({ msg: 'El estado de la orden de trabajo es requerido' });
        }

        // Buscar todas las órdenes de trabajo con el estado especificado
        const ordenesTrabajo = await orden_trabajo.findAll({
            where: { ord_estado: estado },
            //Traer información del usuario asociado
            include: [
                {
                    model: usuario,
                    include: [
                        {
                            model: persona,
                            attributes: ['pe_nombres', 'pe_apellidos']
                        }
                    ],
                    attributes: ['id_usuario_correo']
                }
            ]
        });

        // Si no se encontraron órdenes de trabajo con ese estado, responder con un mensaje
        if (!ordenesTrabajo || ordenesTrabajo.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron órdenes de trabajo con ese estado' });
        }

        // Si se encontraron órdenes de trabajo, responder con los datos
        return res.status(200).json({ ordenesTrabajo });
    } catch (error) {
        // Si ocurre un error, responder con un error 500
        console.error('Error al obtener las órdenes de trabajo por estado:', error);
        return res.status(500).json({ msg: 'Ups ocurrió un error al obtener las órdenes de trabajo por estado', error });
    }
};

