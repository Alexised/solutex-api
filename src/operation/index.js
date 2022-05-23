'use strict'
/**
 * Entities endpoint
 */

const { Router } = require('express');

const controller = require('./index.controller');

const router = new Router();

router.get('/', controller.getAllOperations);
router.post('/', controller.createOperations);

module.exports = router;
