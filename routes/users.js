var express = require('express');
var router = express.Router();
const usersController = require('../controllers/user_controller');

router.use( (req,res,next) => {
  app = req.app;
  next();
});
/* GET users listing. */
router.get('/', usersController.index);

router.get('/index', usersController.index);
router.get('/users/new', usersController.new);
router.get('/users/:id', usersController.edit);
router.post('/users/update', usersController.update);
router.post('/users', usersController.create);
router.post('/users/delete', usersController.delete);


module.exports = router;
