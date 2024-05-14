import { DataTypes } from 'sequelize';
import sequelize from '../db/db_connection'; // Asegúrate de importar tu instancia de Sequelize correctamente// Importa el modelo de Producto
import { usuario } from './user.model';
import { vehiculo } from './vehicles.model';
import { categoria } from './maintenance';

const orden_trabajo = sequelize.define('orden_trabajo',
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
            allowNull: true,
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
        ord_tiempo_ejecucion: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ord_tipo_mantenimiento: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        fk_id_usuario_correo: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        fk_id_vehiculo: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        fk_id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'orden_trabajo',
        timestamps: false
    }
)

//Relacion de usuario y orden de trabajo (Un usuario puede tener una o muchas ordenes de trabajo)
usuario.hasMany(orden_trabajo, { foreignKey: 'fk_id_usuario_correo', sourceKey: 'id_usuario_correo' })
orden_trabajo.belongsTo(usuario, { foreignKey: 'fk_id_usuario_correo', targetKey: 'id_usuario_correo' })

//Relacion de vehiculo y orden de trabajo (Un vehiculo puede tener asociado una o muchas ordenes de trabajo).
vehiculo.hasMany(orden_trabajo, { foreignKey: 'fk_id_vehiculo', sourceKey: 'id_vehiculo' })
orden_trabajo.belongsTo(vehiculo, { foreignKey: 'fk_id_vehiculo', targetKey: 'id_vehiculo' })

//Relación de categoria y orden de trabajo
categoria.hasOne(orden_trabajo, { foreignKey: 'fk_id_categoria', sourceKey: 'id_categoria' })
orden_trabajo.belongsTo(categoria, { foreignKey: 'fk_id_categoria', targetKey: 'id_categoria' })


export { orden_trabajo }