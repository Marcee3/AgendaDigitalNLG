import { check, validationResult } from "express-validator"; 
import Empleado from "../models/Empleado.js";
import Evento from "../models/Evento.js";

//Página principal
const index = (req, res) => {
    res.render('index', {
        titulo: 'Agenda Digital'
    });
};

//Sobre la App
const sobre = (req, res) => {
    res.render('about/sobre', {
        titulo: 'Sobre la App'
    });
};

const informacion = (req, res) => {
    res.render('about/cliente', {
        titulo: 'Sobre la App - Clientes'
    });
}
//Página de formulario login
const login = (req, res) => {
    res.render('auth/login', {
        titulo: 'Novias los gatitos - Iniciar sesión',
        error: req.query.error
    });
}

// Iniciar sesión
const iniciarSesion = async (req, res) => {
    await check('telefono').notEmpty().withMessage('El telefono no puede ir vacío').run(req);
    await check('contrasena').notEmpty().withMessage('La contraseña no puede ir vacía').run(req);

    const resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        return res.redirect('/login?error=campos');
    }

    const {telefono, contrasena} = req.body;

    try{
        const empleado = await Empleado.findOne({ where: {telefono}});
        if (!empleado) {
            return res.redirect('/login?error=noexiste');
        }

        if (empleado.rol !== 'Administradora') {
            return res.redirect('/login?error=sinpermiso');
        }

        if (contrasena !== empleado.contrasena) {
            return res.redirect('/login?error=contrasena');
        }

        req.session.usuario = {
            id: empleado.id,
            telefono: empleado.telefono,
            rol: empleado.rol
        };

        return res.redirect('/admin');


    } catch (error) {
        console.error(error);
        return res.status(500).json({msg: 'Error en el servidor'});
    }
};

//Sesiones
const logout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');                                 
    });
};

//Página del administrador
const admin = async(req, res) => {
    try {
        const empleados = await Empleado.findAll({ // Obtenemos todos los empleados
            order: [['apPaterno', 'ASC']]
        });
        res.render('admin/index', {
            titulo: 'Gestionar Agenda',
            empleados,
            error: req.query.error || null, // Si hay un error, lo mostramos
            tipoEvento : req.query.tipoEvento || null, // Si hay un tipo de evento, lo mostramos
            dia: req.query.dia || null, // Si hay un dia, lo mostramos
        });
    } catch (error) {
        console.error('Error al obtener los empleados: ', error);
        res.status(500).send('Error del servidor');
    }
}; 

//Guardar un evento
const guardarEvento = async(req, res) => {
    try {
        const { tipoEvento, id_Empleado, fechaEvento, horaEvento, nombreCliente, 
            telefonoCliente, codigoVestido,detalles } = req.body;

         //Limite de eventos
        const limiteEventos = await Evento.count({
            where: {
                tipoEvento,
                fechaEvento
            }
        });
            if (limiteEventos >= 6) {
                return res.redirect(`/admin?error=limite&tipoEvento=${tipoEvento}`);
            }
        
        //Limitaciones de dias para entregas y medidas
        const dia = new Date(fechaEvento).getDay();
        if ((tipoEvento === 'Entrega' || tipoEvento === 'Medida') && dia === 0) {
            return res.redirect(`/admin?error=dia&tipoEvento=${tipoEvento}`);
        }
        if (tipoEvento === 'Entrega' && dia === 6) {
            return res.redirect(`/admin?error=dia&tipoEvento=${tipoEvento}`);
        }

        //Validacion para no crear eventos en dias anteriores
        const fechaActual = new Date(`${fechaEvento}T${horaEvento}`);
        const actual = new Date();

        if (fechaActual < actual) {
            return res.redirect(`/admin?error=fecha&tipoEvento=${tipoEvento}`);
        }

        await Evento.create({
            tipoEvento: tipoEvento,
            id_Empleado: id_Empleado,
            fechaEvento,
            horaEvento,
            nombreCliente,
            telefonoCliente,
            codigoVestido,
            detalles
        });

        res.redirect('/admin/admin'); //Comprobar si quito el /admin/admin

    } catch (error) {
        console.error('Error al guardar el evento: ', error);
        res.status(500).send('Error del servidor');
    }
};

const cancelarEvento = async(req, res) => {
    const { id_Evento } = req.params;
    try {
        const evento = await Evento.findByPk(id_Evento);
        if (!evento) {
            return res.status(404).json({ msg: 'Evento no encontrado' });
        }
        evento.status = 'Cancelado';
        await evento.save();
        const rutaRedirect = {
            'CitaInicial': '/admin/citas',
            'Entrega': '/admin/entrega',
            'Medidas': '/admin/medidas',
            'Planchado': '/admin/planchado'
        }[evento.tipoEvento] || '/';

        res.redirect(rutaRedirect); 
    } catch (error) {
        console.error('Error al guardar el evento: ', error);
        res.status(500).send('Error del servidor');
    }
};

const terminarEvento = async(req, res) => {
    const { id_Evento } = req.params;
    try {
        const evento = await Evento.findByPk(id_Evento);
        if (!evento) {
            return res.status(404).json({ msg: 'Evento no encontrado' });
        }
        evento.status = 'Completado';
        await evento.save();
        const rutaRedirect = {
            'CitaInicial': '/admin/citas',
            'Entrega': '/admin/entrega',
            'Medidas': '/admin/medidas',
            'Planchado': '/admin/planchado'
        }[evento.tipoEvento] || '/';

        res.redirect(rutaRedirect); 
    } catch (error) {
        console.error('Error al guardar el evento: ', error);
        res.status(500).send('Error del servidor');
    }
};

const editar = async(req, res) => {
    const { id_Evento } = req.params;
    try {
        const evento = await Evento.findByPk(id_Evento, {
            include: [{model: Empleado, as: 'empleado'}]
        });
        if (!evento) {
            return res.status(404).json({ msg: 'Evento no encontrado' });
        }
        res.render('admin/editar', {
            titulo: 'Detalles del Evento',
            evento
        });
    } catch (error) {
        console.error('Error al guardar el evento: ', error);
        res.status(500).send('Error del servidor');
    }
}

const actualizar = async(req, res) => {
    const { id_Evento } = req.params;
    const { tipoEvento, fechaEvento, horaEvento, nombreCliente, telefonoCliente, codigoVestido, detalles } = req.body;
    try {
        const evento = await Evento.findByPk(id_Evento);
        if (!evento) {
            return res.status(404).json({ msg: 'Evento no encontrado' });
        }

        evento.fechaEvento = fechaEvento;
        evento.horaEvento = horaEvento;
        evento.nombreCliente = nombreCliente;
        evento.telefonoCliente = telefonoCliente;
        evento.codigoVestido = codigoVestido;
        evento.detalles = detalles;

        await evento.save();
        const rutaRedirect = {
            'CitaInicial': '/admin/citas',
            'Entrega': '/admin/entrega',
            'Medidas': '/admin/medidas',
            'Planchado': '/admin/planchado',
            'Editar': `/admin/editar/${id_Evento}`
        }[evento.tipoEvento] || '/';

        res.redirect(rutaRedirect); 
    } catch (error) {
        console.error('Error al actualizar el evento: ', error);
        res.status(500).send('Error del servidor');
    }
};

export {
    index,
    sobre,
    informacion,
    login,
    iniciarSesion,
    logout,
    admin,
    guardarEvento,
    cancelarEvento,
    terminarEvento,
    editar, 
    actualizar
}