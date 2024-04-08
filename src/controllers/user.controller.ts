import { Request, Response } from 'express';
import { PersonaModel, UsuarioModel, persona, usuario } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response): Promise<Response | void> => {

    try {
        const { id_correo, contrasenia, id_persona, nombres, apellidos, telefono, fecha_nacimiento } = req.body;

        // Validar datos de entrada
        if (!id_correo || !contrasenia || !id_persona || !nombres || !apellidos || !telefono || !fecha_nacimiento) {
            return res.status(400).json({ msg: 'Por favor, proporcione todos los campos requeridos.' });
        }

        // Validar si el usuario ya existe en la base de datos
        const existingUser = await usuario.findOne({ where: { id_usuario_correo: id_correo } });
        const existingPerson = await persona.findOne({ where: { id_persona: id_persona } });

        if (existingUser || existingPerson) {
            return res.status(409).json({ msg: `Ya existe un usuario con el correo ${id_correo} o número de identificación ${id_persona}` });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        // Crear la persona
        await persona.create({
            id_persona,
            pe_nombres: nombres,
            pe_apellidos: apellidos,
            pe_telefono: telefono,
            pe_fecha_nacimiento: fecha_nacimiento,
        });

        // Crear el usuario asociado a la persona
        await usuario.create({
            id_usuario_correo: id_correo,
            usu_contrasena: hashedPassword,
            usu_rol: 'O',
            usu_estado: 1,
            fk_id_persona: id_persona
        });

        res.status(201).json({ msg: `Usuario ${id_correo} creado exitosamente` });
    } catch (error) {
        console.error('Error en registro de usuario:', error);
        res.status(500).json({ msg: 'Ups, ocurrió un error interno del servidor' });
    }
};



export const loginUser = async (req: Request, res: Response): Promise<Response | void> => {

    try {
        const { id_correo, contrasenia } = req.body

        // Validar datos de entrada
        if (!id_correo || !contrasenia) {
            return res.status(400).json({ msg: 'Por favor, proporcione todos los campos requeridos.' });
        }


        //Validar estado del usuario (ACTIVO)
        const usuarioActivo: UsuarioModel | null = await usuario.findOne({ where: { usu_estado: 1, id_usuario_correo: id_correo } })

        //Validamos si el usuario existe en la base de datos
        const usuarioExistente: UsuarioModel | null = await usuario.findOne({ where: { id_usuario_correo: id_correo } })
        
        if (!usuarioExistente || !usuarioActivo) {
            return res.status(404).json({
                msg: `No existe un usuario con el correo ${id_correo} en la base de datos o no se encuentra activo`
            })
        }

         // Obtener información de la persona asociada al usuario
        const personaUsuario: PersonaModel | null = await persona.findOne({ where: { id_persona: usuarioExistente.fk_id_persona } })

        //Validamos la contraseña del usuario
        const contraseniaValida = await bcrypt.compare(contrasenia, usuarioExistente?.usu_contrasena)
        if (!contraseniaValida) {
            return res.status(400).json({
                msg: 'Contrasenia incorrecta'
            })
        }

        //Si la contraseña es válida : Generamos un JWT Token para proteger las rutas de acceso
        const token = jwt.sign({
            correo: id_correo,
            nombres: personaUsuario?.pe_nombres,
            apellidos: personaUsuario?.pe_apellidos,
            telefono: personaUsuario?.pe_telefono
        }, process.env.SECRET_KEY ?? 'N35kxkHHhCz49eVge6X0C@GckT!@', { expiresIn: '3600000' })
        
        res.status(200).json({
            token,
            rol: usuarioExistente.usu_rol
        })

    } catch (error) {
        console.error('Error en inicio de sesión:', error);
        res.status(500).json({ msg: 'Ups, ocurrió un error interno del servidor' });
    }
}
