const ruta = (req, res, next) => {
    if (!req.session.usuario || req.session.usuario.rol !== 'Administradora') {
        return res.redirect('/login?error=sinacceso');
    }
    next();
};

export{
    ruta
}