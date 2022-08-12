const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const { q, nombre='No name', apikey, page = 1, limit = 10} = req.query;
    res.json({
        msg: 'Get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit,
    });
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.status(201).json({
        msg: 'Post API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.status(400).json({
        msg: 'Put API - controlador',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    const id = req.params.id;
    res.status(200).json({
        msg: 'Delete API - controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'Patch API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
};