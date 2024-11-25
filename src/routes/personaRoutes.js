// routes/personaRoutes.js
const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');
const { body } = require('express-validator');

const validarPersona = [
  body('nombre').notEmpty().trim().escape()
    .withMessage('El nombre es obligatorio'),
  body('apellido').notEmpty().trim().escape()
    .withMessage('El apellido es obligatorio'),
  body('edad').isInt({ min: 0 })
    .withMessage('La edad debe ser un número entero positivo'),
  body('contacto.email').isEmail()
    .withMessage('El email debe ser válido'),
  body('contacto.telefono').optional().trim(),
  body('contacto.direccion').optional().trim()
];

router.post('/', validarPersona, personaController.crearPersona);
router.get('/', personaController.obtenerPersonas);
router.get('/:id', personaController.obtenerPersonaPorId);
router.put('/:id', validarPersona, personaController.actualizarPersona);
router.delete('/:id', personaController.eliminarPersona);

module.exports = router;