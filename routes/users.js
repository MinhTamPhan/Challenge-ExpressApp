var express = require('express');
var router = express.Router();
const usersController = require('../controller/user');
/* GET users listing. */
router.get('/', usersController.index);

module.exports = router;
