const { response, json } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt.js');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response, next) => {
    const { id_token } = req.body;

    try {
        const {nombre, correo, img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado){
            return res.status(401).json({
                msg: 'El usuario esta inactivo por favor contacte el administrador'
            });
        }
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({ ok: false, msg: `Error: ${error.message}`});
    }

}

module.exports = {
    login,
    googleSignIn
}