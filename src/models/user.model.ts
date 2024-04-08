import { DataTypes, Model } from 'sequelize'
import sequelize from '../db/db_connection'

export interface UsuarioModel extends Model {
    id_usuario_correo: string;
    usu_contrasena: string;
    usu_rol: string;
    usu_estado: number;
    fk_id_persona: number;
}

export interface PersonaModel extends Model {
    id_persona: number;
    pe_nombres: string;
    pe_apellidos: string;
    pe_telefono: number;
    pe_fecha_nacimiento: string;
}

const persona = sequelize.define<PersonaModel>('Persona', {
    id_persona: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    pe_nombres: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    pe_apellidos: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    pe_telefono: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    pe_fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},
{
    tableName: 'Persona',
    timestamps: false
}
)

    const usuario= sequelize.define<UsuarioModel>('Usuario',
        {
            id_usuario_correo: {
                type: DataTypes.STRING(60),
                primaryKey: true,
                unique: true,
                allowNull: false
            },
            usu_contrasena: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            usu_rol: {
                type: DataTypes.CHAR,
                allowNull: false,
            },
            usu_estado: {
                type: DataTypes.TINYINT,
                allowNull: false,
            },
            fk_id_persona: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
        },
        {
            tableName: 'Usuario',
            timestamps: false
        }
    )

persona.hasOne(usuario, { foreignKey: 'fk_id_persona', sourceKey: 'id_persona' })
usuario.belongsTo(persona, { foreignKey:'fk_id_persona', targetKey: 'id_persona'})

export { usuario, persona };

