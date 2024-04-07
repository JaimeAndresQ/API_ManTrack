import { DataTypes } from 'sequelize';
import sequelize from '../db/db_connection'; // Asegúrate de importar tu instancia de Sequelize correctamente// Importa el modelo de Producto
import { usuario } from './user.model';
import { mantenimiento } from './maintenance';

const orden_trabajo = sequelize.define('Orden_trabajo',
    {
        id_orden_trabajo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        ord_descripcion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ord_observaciones: {
            type: DataTypes.STRING(255),
        },
        ord_fecha_realizacion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ord_estado: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        ord_tiempo_estimado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fk_id_usuario_correo: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        fk_id_mantenimiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'Orden_trabajo',
        timestamps: false
    }
)

//Relacion de usuario y orden de trabajo (Un usuario puede tener una o muchas ordenes de trabajo)
usuario.hasMany(orden_trabajo, {foreignKey: 'fk_id_usuario_correo', sourceKey: 'id_usuario_correo'})
orden_trabajo.belongsTo(usuario, {foreignKey: 'fk_id_usuario_correo', targetKey: 'id_usuario_correo'})

//Relacion de mantenimiento y orden de trabajo.
mantenimiento.hasOne(orden_trabajo, {foreignKey: 'fk_id_mantenimiento', sourceKey: 'id_mantenimiento'})
orden_trabajo.belongsTo(mantenimiento, {foreignKey: 'fk_id_mantenimiento', targetKey: 'id_mantenimiento'})


export { orden_trabajo }