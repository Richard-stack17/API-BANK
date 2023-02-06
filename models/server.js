const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require('../database/db');
const { userRouter } = require('../routes/user.routes');
const { transferRouter } = require('../routes/transfer.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 6000;
    this.paths = {
      user: '/api/v1/user',
      transfer: '/api/v1/transfer',
    };
    this.database();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      console.log('HOLA ESTOY EN DESARROLLO');
      this.app.use(morgan('dev'));
    }
    if (process.env.NODE_ENV === 'production') {
      console.log('HOLA ESTOY EN PRODUCCIÓN');
    }
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.user, userRouter),
      this.app.use(this.paths.transfer, transferRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running on Por', this.port);
    });
  }
}

module.exports = Server;
