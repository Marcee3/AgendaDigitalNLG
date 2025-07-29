import Empleado from "../models/Empleado.js";
import Evento from "../models/Evento.js";

//Vista de vendedoras
const citaVenta = async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            where: { tipoEvento: 'CitaInicial' },
            include: [
                { model: Empleado, 
                    as: 'empleado',
                    attributes: ['nombre', 'apPaterno', 'apMaterno', 'telefono'] }
            ],
            order: [['fechaEvento', 'ASC']]
        });
        const eventosConNombre = eventos.map(evento => {
            const emp = evento.empleado;
            const nombreCompleto = emp ? emp.nombre : '';
            return {
                ...evento.get({ plain: true }), // Obtiene los datos del evento, tiene puntos suspensivos porque es un objeto
                nombreVendedora: nombreCompleto
            };
        });
        res.render('events/citaVenta', {
            titulo: 'Citas Iniciales',
            eventos: eventosConNombre
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const entregaVenta = async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            where: { tipoEvento: 'Entrega' },
            include: [
                { model: Empleado, as: 'empleado',attributes: ['nombre', 'apPaterno', 'apMaterno', 'telefono'] }
            ],
            order: [['fechaEvento', 'ASC']]
        });
        const eventosConNombre = eventos.map(evento => {
            const emp = evento.empleado;
            const nombreCompleto = emp ? emp.nombre : '';
            return {
                ...evento.get({ plain: true }), // Obtiene los datos del evento, tiene puntos suspensivos porque es un objeto
                nombreVendedora: nombreCompleto
            };
        });
        res.render('events/entregaVenta', {
            titulo: 'Entregas',
            eventos: eventosConNombre
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const medidasVenta = async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            where: { tipoEvento: 'Medidas' },
            include: [
                { model: Empleado, as: 'empleado',attributes: ['nombre', 'apPaterno', 'apMaterno', 'telefono'] }
            ],
            order: [['fechaEvento', 'ASC']]
        });
        const eventosConNombre = eventos.map(evento => {
            const emp = evento.empleado;
            const nombreCompleto = emp ? emp.nombre : '';
            return {
                ...evento.get({ plain: true }), // Obtiene los datos del evento, tiene puntos suspensivos porque es un objeto
                nombreVendedora: nombreCompleto
            };
        });
        res.render('events/medidasVenta', {
            titulo: 'Medidas',
            eventos: eventosConNombre
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const planchadoVenta = async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            where: { tipoEvento: 'Planchado' },
            include: [
                { model: Empleado,as: 'empleado', attributes: ['nombre', 'apPaterno', 'apMaterno', 'telefono'] }
            ],
            order: [['fechaEvento', 'ASC']]
        });
        const eventosConNombre = eventos.map(evento => {
            const emp = evento.empleado;
            const nombreCompleto = emp ? emp.nombre : '';
            return {
                ...evento.get({ plain: true }), // Obtiene los datos del evento, tiene puntos suspensivos porque es un objeto
                nombreVendedora: nombreCompleto
            };
        });
        res.render('events/planchadoVenta', {
            titulo: 'Planchados',
            eventos: eventosConNombre
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};
export{
    citaVenta,
    planchadoVenta,
    medidasVenta,
    entregaVenta
}