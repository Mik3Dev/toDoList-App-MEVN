const express = require('express');
const router = express.Router();
const taskController = require('./../controllers/taskController');
const {authenticate} = require('./../middlewares/authenticate');

router.get('/', authenticate, taskController.index);
router.get('/:id', authenticate, taskController.show);
router.post('/', authenticate, taskController.create);
router.put('/:id', authenticate, taskController.update);
router.delete('/:id', authenticate, taskController.delete);

module.exports = router;