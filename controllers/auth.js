const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt.js');

const login = async(req, res = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ msg: 'El Usuario o contraseña no es correcto - correo' });
        }

        // Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({ msg: 'El Usuario o contraseña no es correcto - estado' });
        }
        // Verificar la contraseña
        const passwordValido = bcryptjs.compareSync(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ msg: 'El Usuario o contraseña no es correcto - contraseña' });
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
           usuario,
           token
        })
    } catch (error) {
        return res.json({
            msg: 'Algo salio mal contacte con el administrador del servidor',
            error
        })
    }
}

module.exports = {
    login,
}