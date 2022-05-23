'use strict'
/**
 * Users endpoint
 */

const { Router } = require('express');

const controller = require('./index.controller');

const router = new Router();

router.post('/', controller.createUser);
router.get('/users/logout', (req, res) => {
  req.logout();
  res.render('index', { message: 'Te has desconectado con éxito.' });
});
router.get('/:id', controller.getUser);
router.post('/login', controller.LoginUser);


module.exports = router;
