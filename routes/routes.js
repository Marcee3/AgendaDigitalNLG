import express from 'express';
import { index, sobre, informacion, login, iniciarSesion,logout, admin, guardarEvento, cancelarEvento, terminarEvento, editar, actualizar, aceptarSolicitud } from '../controllers/controller.js';
import { citaInicial, entrega, medidas, planchado } from '../controllers/eventoController.js';
import { citaVenta, entregaVenta, medidasVenta, planchadoVenta } from '../controllers/usuariosController.js';
import { indexCliente, formularioCita, solicitarEvento, citaCliente, entregaCliente, medidasCliente, planchadoCliente } from '../controllers/clienteController.js';
import { verSolicitudes } from '../controllers/solicitudController.js';
import { ruta } from '../middlewares/sesion.js';

const router = express.Router();

//Vistas de la app
router.get('/', index);

router.get('/citasVenta', citaVenta);
router.get('/entregaVenta', entregaVenta);
router.get('/medidasVenta', medidasVenta);
router.get('/planchadoVenta', planchadoVenta);

router.get('/admin', ruta, admin);

router.get('/sobre', sobre); //Usuario
router.get('/informacion', informacion); //Clientes

//Eventos del Adnimistrador
router.get('/citas', citaInicial);
router.get('/entrega', entrega);
router.get('/medidas', medidas);
router.get('/planchado', planchado);
router.get('/solicitudes', verSolicitudes);

//Guardar Eventos
router.post('/formEvento', guardarEvento);
router.get('/lista', admin)

//Cancelar Eventos
router.post('/evento/:id_Evento/cancelar', cancelarEvento);

//Terminar Eventos
router.post('/evento/:id_Evento/terminar', terminarEvento);

//Editar Eventos
router.get('/evento/:id_Evento/editar', editar);
router.post('/evento/:id_Evento/editar', actualizar)

//Aceptar solicitudes
router.post('/solicitudes/:id_Solicitud/aceptar', aceptarSolicitud);

//Login
router.get('/login', login)
router.post('/login', iniciarSesion);
router.get('/logout', logout);

//Cliente - Vistas
router.get('/cliente', indexCliente);
router.get('/solicitarCita', formularioCita)
router.post('/solicitar', solicitarEvento)

//Eventos del Cliente
router.get('/citasCliente', citaCliente);
router.get('/entregaCliente', entregaCliente);
router.get('/medidasCliente', medidasCliente);
router.get('/planchadoCliente', planchadoCliente);

export default router;