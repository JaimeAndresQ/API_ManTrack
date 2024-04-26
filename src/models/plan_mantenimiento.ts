import { DataTypes } from 'sequelize';
import sequelize from '../db/db_connection';
import { vehiculo } from './vehicles.model';
import { mantenimiento } from './maintenance';

const plan_mantenimiento = sequelize.define('plan_mantenimiento',{
   id_plan_mantenimiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    pl_nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
    },
}, {
    tableName: 'plan_mantenimiento',
    timestamps: false
});

const plan_mantenimiento_tiene_vehiculo = sequelize.define('plan_mantenimiento_tiene_vehiculo',{
    fk_id_vehiculo: {
        type: DataTypes.STRING(6),
        allowNull: false,
        primaryKey: true,
        references: {
            model: vehiculo,
            key: 'id_vehiculo',
        },
    },
    fk_id_plan_mantenimiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: plan_mantenimiento,
            key: 'id_plan_mantenimiento',
        },
    },
 }, {
     tableName: 'plan_mantenimiento_tiene_vehiculo',
     timestamps: false
 });

 
const plan_mantenimiento_tiene_mantenimiento = sequelize.define('plan_mantenimiento_tiene_mantenimiento',{
    fk_id_mantenimiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: mantenimiento,
            key: 'id_mantenimiento',
        },
    },
    fk_id_plan_mantenimiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: plan_mantenimiento,
            key: 'id_plan_mantenimiento',
        },
    },
    
 }, {
    
     tableName: 'plan_mantenimiento_tiene_mantenimiento',
     timestamps: false,
     
 });


 //Relacion muchos a muchos (Plan de mantenimiento y vehiculo)
vehiculo.hasMany(plan_mantenimiento_tiene_vehiculo, { foreignKey: 'fk_id_vehiculo' });
plan_mantenimiento_tiene_vehiculo.belongsTo(vehiculo, { foreignKey: 'fk_id_vehiculo' });

plan_mantenimiento.hasMany(plan_mantenimiento_tiene_vehiculo, { foreignKey: 'fk_id_plan_mantenimiento' });
plan_mantenimiento_tiene_vehiculo.belongsTo(plan_mantenimiento, { foreignKey: 'fk_id_plan_mantenimiento' });

//Relacion muchos a muchos (Plan de mantenimiento y mantenimiento)
mantenimiento.hasMany(plan_mantenimiento_tiene_mantenimiento, { foreignKey: 'fk_id_mantenimiento' });
plan_mantenimiento_tiene_mantenimiento.belongsTo(mantenimiento, { foreignKey: 'fk_id_mantenimiento' });
 
plan_mantenimiento.hasMany(plan_mantenimiento_tiene_mantenimiento, { foreignKey: 'fk_id_plan_mantenimiento' });
plan_mantenimiento_tiene_mantenimiento.belongsTo(plan_mantenimiento, { foreignKey: 'fk_id_plan_mantenimiento' });


export { plan_mantenimiento, plan_mantenimiento_tiene_vehiculo, plan_mantenimiento_tiene_mantenimiento };
