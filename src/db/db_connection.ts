import { Sequelize } from 'sequelize'
import { DATA_SOURCES } from '../config/vars.config'

const sequelize = new Sequelize(DATA_SOURCES.mysqldbSourse.database as string , DATA_SOURCES.mysqldbSourse.username as string, DATA_SOURCES.mysqldbSourse.password, {
    host: DATA_SOURCES.mysqldbSourse.host,
    dialect: 'mysql',
})

export default sequelize