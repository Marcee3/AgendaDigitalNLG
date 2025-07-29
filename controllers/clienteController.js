import Solicitud from "../models/Solicitud.js";
import Evento from "../models/Evento.js";

//Pagina principal para el cliente
const indexCliente = async (req, res) => {
    res.render('requests/index', {
        titulo: 'Agenda Digital - Solicita tu cita',
    });
};

//Formulario para solicitar una cita
const formularioCita = async (req, res) => {
    res.render('requests/formularioCita', {
        titulo: 'Solicita tu cita',
        error: req.query.error
    });
};

//Solicitar un evento
const solicitarEvento = async (req, res) => {
    try {
        const { nombre, apPaterno, apMaterno, telefono, fechaEvento, horaEvento, tipoEvento, detalles } = req.body;

        //Limite de solicitudes?? 

        await Solicitud.create({
            nombre,
            apPaterno,
            apMaterno,
            telefono,
            fechaEvento,
            horaEvento,
            tipoEvento,
            detalles
        });

        return res.redirect('/cliente'); //Agregar un mensaje que diga que se ha generado su solicitud

    } catch (error) {
        console.error('Error al guardar la solicitud: ', error);
        res.status(500).send('Error del servidor');
    }
};

//Vista de eventos
const citaCliente = async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            where: { tipoEvento: 'CitaInicial' },
            order: [['fechaEvento', 'ASC']]
        });

        res.render('requests/citaInicial', {
            titulo: 'Agenda Digital - Citas',
            eventos
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const entregaCliente = async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            where: { tipoEvento: 'Entrega' },
            order: [['fechaEvento', 'ASC']]
        });

        res.render('requests/entregas', {
            titulo: 'Agenda Digital - Entregas',
            eventos
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const medidasCliente = async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            where: { tipoEvento: 'Medidas' },
            order: [['fechaEvento', 'ASC']]
        });

        res.render('requests/medidas', {
            titulo: 'Agenda Digital - Medidas',
            eventos
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

const planchadoCliente = async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            where: { tipoEvento: 'Planchado' },
            order: [['fechaEvento', 'ASC']]
        });

        res.render('requests/planchado', {
            titulo: 'Agenda Digital - Planchados',
            eventos
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export{
    indexCliente,
    formularioCita,
    solicitarEvento,
    citaCliente,
    entregaCliente,
    medidasCliente,
    planchadoCliente
}