const { Router } = require('express');
const { transferProcess } = require('../controllers/transfers.controller.');

const router = Router();

router.post('/', transferProcess);

module.exports = {
  transferRouter: router,
};
