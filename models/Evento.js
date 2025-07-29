import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Evento = db.define('evento', {
    id_Evento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoEvento: {
        type: DataTypes.ENUM('CitaInicial', 'Medidas', 'Entrega', 'Planchado'),
        allowNull: false
    },
    id_Empleado: {
        type: DataTypes.INTEGER,
        references: {
            model: 'empleados', 
            key: 'id_Empleado'
        }
    },
    fechaEvento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horaEvento: {
        type: DataTypes.TIME,
        allowNull: false
    },
    nombreCliente: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    telefonoCliente: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    codigoVestido: {
        type: DataTypes.STRING(25),

    }, 
    detalles: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Pendiente', 'Completado', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Pendiente'
    }
});

export default Evento;