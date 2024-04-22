import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db_connection';
import { vehiculo } from './vehicles.model';
import { mantenimiento } from './maintenance';

class plan_mantenimiento extends Model { }

plan_mantenimiento.init({
    fk_id_vehiculo: {
        type: DataTypes.STRING(6),
        allowNull: false,
        primaryKey: true,
        references: {
            model: vehiculo,
            key: 'id_vehiculo',
          },
    },
    fk_id_mantenimiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: mantenimiento,
            key: 'id_mantenimiento',
          },
    },
    pl_nombre: {
        type: DataTypes.STRING(155),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'plan_mantenimiento',
    timestamps: false
});

export { plan_mantenimiento };
