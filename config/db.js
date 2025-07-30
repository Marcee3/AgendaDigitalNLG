import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({path: '.env'});

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USUARIO, process.env.BD_PASS ?? '', {
    host: process.env.BD_HOST,
    dialect: 'mysql',
    port: parseInt(process.env.BD_PUERTO, 10) || 3306,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // 30 seconds para obtener un pool
        idle: 10000 // 10 seconds para que el pool de conexiones no se quede inactivo
    }
});

export default db;