import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Solicitud = db.define('solicitud', {
    id_Solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    apPaterno: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    apMaterno: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    }, 
    fechaEvento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horaEvento: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tipoEvento: {
        type: DataTypes.ENUM('CitaInicial', 'Medidas', 'Entrega', 'Planchado'),
        allowNull: false
    },
    detalles: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Denegado', 'Pendiente', 'Aceptado'),
        allowNull: false,
        defaultValue: 'Pendiente'
    }
}, {
    tableName: 'solicitudes' 
});

export default Solicitud;
