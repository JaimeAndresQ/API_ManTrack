import { DataTypes } from 'sequelize';
import sequelize from '../db/db_connection'; 
import { vehiculo } from './vehicles.model'; 

const mantenimiento = sequelize.define('Mantenimiento',
    {
        id_mantenimiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        man_tipo_mantenimiento: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        man_descripcion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        man_fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        fk_id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fk_id_vehiculo: {
            type: DataTypes.STRING(6),
            allowNull: false,
        }
    },
    {
        tableName: 'Mantenimiento',
        timestamps: false
    }
)

const categoria = sequelize.define('Categoria', 
    {
        id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        cat_nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        }
    },
    {
        tableName: 'Categoria',
        timestamps: false
    }

)

//Relación uno a muchos de vehiculo y mantenimiento
vehiculo.hasMany(mantenimiento, { foreignKey: 'fk_id_vehiculo', sourceKey: 'id_vehiculo'})
mantenimiento.belongsTo(vehiculo, { foreignKey: 'fk_id_vehiculo', targetKey: 'id_vehiculo'})

//Relación de categoria y mantenimiento
categoria.hasOne(mantenimiento, {foreignKey: 'fk_id_categoria', sourceKey: 'id_categoria'})
mantenimiento.belongsTo(categoria, {foreignKey: 'fk_id_categoria', targetKey: 'id_categoria' })

export {mantenimiento, categoria}