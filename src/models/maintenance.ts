import { DataTypes } from 'sequelize';
import sequelize from '../db/db_connection'; 

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
        man_duracion_estimada: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fk_id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false
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


//Relación de categoria y mantenimiento
categoria.hasOne(mantenimiento, {foreignKey: 'fk_id_categoria', sourceKey: 'id_categoria'})
mantenimiento.belongsTo(categoria, {foreignKey: 'fk_id_categoria', targetKey: 'id_categoria' })

export {mantenimiento, categoria}