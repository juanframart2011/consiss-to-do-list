const express = require('express');
const router = express.Router();
const ToDoController = require('../controllers/ToDoController');

// Definir rutas para usuarios
router.get('/', ToDoController.getAll);
router.get('/:id', ToDoController.getDetailById);
router.post('/', ToDoController.create);
router.put('/:id', ToDoController.update);
router.delete('/:id', ToDoController.delete);

module.exports = router;