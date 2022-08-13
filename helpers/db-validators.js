const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const existeCorreo = async(correo = '') => {
    const existe = await Usuario.findOne({correo});
    if (existe) {
        throw new Error(`El correo ${correo} ya está registrado en la base de datos`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existe = await Usuario.findById(id);
    if (!existe) {
        throw new Error(`El usuario con ID ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    existeCorreo,
    existeUsuarioPorId,
}