import express, { Application } from 'express';
import routesUser from '../routes/user.routes';
import cors from 'cors'
import sequelize from '../db/db_connection';
import { persona, usuario } from './user.model';
import { vehiculo } from './vehicles.model';
import { categoria, mantenimiento } from './maintenance';
import { orden_trabajo } from './orden_trabajo';
import routesVehiculo from '../routes/vehiculo.routes';
import  swaggerUi  from 'swagger-ui-express';
import swaggerSetup from '../docs/swagger';

class Server {
    private app: Application
    private port: number


    constructor() {
        this.app = express();
        this.port = 80;
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`)
        })
    }

    routes() {
        this.app.use('/api/users', routesUser);
        this.app.use('/api/vehiculos', routesVehiculo)
        this.app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
    }

    midlewares() {
        this.app.use(express.json())
        this.app.use(cors())
    }

    async dbConnect() {
        try {
            await sequelize.authenticate();
            console.log('Conexion con la DB ha sido establecida exitosamente');
            await usuario.sync()
            await persona.sync()
            await vehiculo.sync()
            await mantenimiento.sync()
            await orden_trabajo.sync()
            await categoria.sync()
        } catch (error) {
            console.log(`Conexion fallida - Error ${error}`)
        }
    }

}

export default Server;