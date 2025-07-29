import { DataTypes} from "sequelize";
import db from "../config/db.js";

const Empleado = db.define('empleado', {
    id_Empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    contrasena: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('Administradora', 'Vendedora'),
        allowNull: false,
        defaultValue: 'Vendedora'
    }
});

export default Empleado;