import Solicitud from "../models/Solicitud.js";

// Mostrar todas las solicitudes al administrador
const verSolicitudes = async (req, res) => {
    try {
        const solicitudes = await Solicitud.findAll({
            order: [['fechaEvento', 'ASC'], ['horaEvento', 'ASC']]
        });

        res.render('admin/solicitudes', {
            titulo: 'Solicitudes de Clientes',
            solicitudes
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las solicitudes');
    }
};

export {
    verSolicitudes
};
