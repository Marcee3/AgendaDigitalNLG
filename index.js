import express from 'express';
import session from 'express-session';
import routes from './routes/routes.js'
import db from './config/db.js';
import './models/relaciones.js';


const app = express();

//Conexión a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Conexión a la base de datos exitosa');
} catch(error) {
    console.log('Error de conexión a la base de datos:', error);
    process.exit(1);
}

//Motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

//Carpeta publica
app.use(express.static('./public'));

//Servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto http://localhost:${port}`);
});

//Rutas
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'ng9fde4ws',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60   // 1 hora
    }
}));

app.use('/', routes);
app.use('/admin', routes);
app.use('/auth', routes);
app.use('/events', routes);
app.use('/requests', routes);
app.use('/about', routes);
//app.use('/carpeta', archivoRouter);