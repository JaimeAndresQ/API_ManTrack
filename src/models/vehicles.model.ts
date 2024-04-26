import { DataTypes } from 'sequelize'
import sequelize from '../db/db_connection'

 const vehiculo = sequelize.define('Vehiculo',
    {
        id_vehiculo: {
            type: DataTypes.STRING(6),
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        veh_marca: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        veh_modelo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        veh_linea: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        veh_color: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        veh_capacidad: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        veh_clase_vehiculo: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        veh_cilindraje: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        veh_tipo_combustible: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        veh_numero_motor: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        veh_numero_chasis: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        veh_vin: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        veh_ciudad_registro: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        veh_fecha_matricula: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    },
    {
        tableName: 'Vehiculo',
        timestamps: false
    }
)

export {vehiculo}