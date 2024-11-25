const express = require('express');
const router = express.Router();
const fraganciaController = require('../controllers/fraganciaController');
const { body } = require('express-validator');

const validarFragancia = [
  body('nombre').notEmpty().trim().escape().withMessage('El nombre es obligatorio'),
  body('marca').notEmpty().trim().escape().withMessage('La marca es obligatoria'),
  body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('descripcion').optional().trim(),
  body('stock').isInt({ min: 0 }).optional().withMessage('El stock debe ser un número entero positivo'),
  body('imagen').optional().trim()
];

router.post('/', validarFragancia, fraganciaController.crearFragancia);
router.get('/', fraganciaController.obtenerFragancias);
router.get('/:nombre', fraganciaController.obtenerFraganciaPorNombre); 
router.get('/id/:id', fraganciaController.obtenerFraganciaPorId); 
router.put('/:id', validarFragancia, fraganciaController.actualizarFragancia);
router.delete('/:id', fraganciaController.eliminarFragancia);

module.exports = router;
