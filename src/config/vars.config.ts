import * as dotenv from 'dotenv'

dotenv.config()

export const DATA_SOURCES = {
    mysqldbSourse: {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        conectionLimit: 100
    }
}