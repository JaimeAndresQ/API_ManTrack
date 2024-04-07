import { Request, Response } from 'express';
import { UsuarioModel, persona, usuario } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const newUser = async (req: Request, res: Response) => {
  
    //Primeramente se agrega los datos de usuario
    const { id_correo, contrasenia} = req.body

    //Luego se agrega la información correspondiente al usuario (Persona)
    const {id_persona, nombres, apellidos, telefono, fecha_nacimiento } = req.body


    //Validamos si el usuario ya existe en la base de datos....
    const usuarioExistente = await usuario.findOne({ where: {id_usuario_correo: id_correo}})
    const personaExistente = await persona.findOne({ where: {id_persona: id_persona}})

    //Validamos que los usuarios no existan en la base de datos
    if(usuarioExistente || personaExistente){
        res.status(404).json({
            msg: `Ya existe un usuario con el correo ${id_correo} O numero de identificacion ${id_persona}`
        })
    }else {
        //Encripta la contrasenia para agregarla en la base de datos
        const hashedPassword = await bcrypt.hash(contrasenia, 10)

        try {

            //Crear la instancia de persona con los datos personales para luego relacionarlo con el usuario que quiera registrar
            await persona.create({
                id_persona: id_persona,
                pe_nombres: nombres,
                pe_apellidos: apellidos,
                pe_telefono: telefono,
                pe_fecha_nacimiento: fecha_nacimiento,
            })

            //Crear el usuario en la base de datos con los datos ingresados con el rol de operario (DEFAULT) y asociamos la persona creada
            usuario.create({
                id_usuario_correo: id_correo,
                usu_contrasena: hashedPassword,
                usu_rol: 'O',
                usu_estado: 1,
                fk_id_persona: id_persona
            })
            res.json({
                msg: `Usuario ${id_correo} creado exitosamente`,
            })
        }catch(error){
            res.status(500).json({
                msg: 'Ups ocurrio un error',
                error
            })
        }
    }
}



export const loginUser = async (req: Request, res: Response): Promise<Response | void> => {
    
    const {id_correo, contrasenia } = req.body

    //Validar estado del usuario (ACTIVO)
    const usuarioActivo: UsuarioModel  | null = await usuario.findOne({where: {usu_estado: 1, id_usuario_correo: id_correo}})

    //Validamos si el usuario existe en la base de datos
    const usuarioExistente: UsuarioModel  | null = await usuario.findOne({ where: {id_usuario_correo: id_correo}})
    if(!usuarioExistente || !usuarioActivo){
        return res.status(404).json({
            msg: `No existe un usuario con el correo ${id_correo} en la base de datos o no se encuentra activo`
        })
    }

    //Validamos la contraseña del usuario
    const contraseniaValida = await bcrypt.compare(contrasenia, usuarioExistente?.usu_contrasena)
    if(!contraseniaValida){
        return res.status(400).json({
            msg: 'Contrasenia incorrecta'
        })
    }
    //Si la contraseña es válida : Generamos un JWT Token para proteger las rutas de acceso
    const token = jwt.sign({
        correo: id_correo,
    }, process.env.SECRET_KEY ?? 'N35kxkHHhCz49eVge6X0C@GckT!@', {expiresIn: '3600000'})

    const userInfo = await usuario.findByPk(id_correo)

    res.status(200).json({token,
        rol: userInfo?.getDataValue('usu_rol')
    })
    
}






export const getUser = async (req: Request, res: Response): Promise<Response | void>  => {
    
    const { id_correo, contrasenia } = req.body;

    try {
        const usuarioExistente = await usuario.findOne({ where: { id_usuario_correo: id_correo, usu_contrasena: contrasenia } });
        if (usuarioExistente) {
            // Generamos un JWT Token para proteger las rutas de acceso
            const token = jwt.sign({
                correo: id_correo,
            }, process.env.SECRET_KEY ?? 'N35kxkHHhCz49eVge6X0C@GckT!@', { expiresIn: '7d' });

            const userInfo = await usuario.findByPk(id_correo);

            if (userInfo) {
                return res.status(200).json({
                    
                    token,
                    
                });
            } else {
                return res.status(404).json({
                    msg: `Usuario no encontrado ${id_correo}`,
                });
            }
        } else {
            return res.status(404).json({
                msg: `Usuario no encontrado ${id_correo}`,
            });
        }
    } catch (error) {
        return res.status(400).json({ msg: error || 'Error interno del servidor' });
    }
};
