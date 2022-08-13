const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Cors
        this.app.use(cors());
        // Lectura y parseo del Body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    }
}

module.exports = Server;