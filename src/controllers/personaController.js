// controllers/personaController.js
const Persona = require('../models/Persona');

exports.crearPersona = async (req, res) => {
  try {
    const persona = new Persona(req.body);
    await persona.save();

    res.status(201).json({
      exito: true,
      datos: persona,
      mensaje: 'Persona registrada exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      exito: false,
      error: error.message
    });
  }
};

exports.obtenerPersonas = async (req, res) => {
  try {
    const filtros = {};
    
    if (req.query.nombre) {
      filtros.nombre = new RegExp(req.query.nombre, 'i');
    }
    if (req.query.apellido) {
      filtros.apellido = new RegExp(req.query.apellido, 'i');
    }
    if (req.query.edad) {
      filtros.edad = req.query.edad;
    }

    const personas = await Persona.find(filtros);
    
    res.status(200).json({
      exito: true,
      cantidad: personas.length,
      datos: personas
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      error: error.message
    });
  }
};

exports.obtenerPersonaPorId = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);

    if (!persona) {
      return res.status(404).json({
        exito: false,
        error: 'Persona no encontrada'
      });
    }

    res.status(200).json({
      exito: true,
      datos: persona
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      error: error.message
    });
  }
};

exports.actualizarPersona = async (req, res) => {
  try {
    const persona = await Persona.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!persona) {
      return res.status(404).json({
        exito: false,
        error: 'Persona no encontrada'
      });
    }

    res.status(200).json({
      exito: true,
      datos: persona,
      mensaje: 'Información de la persona actualizada exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      exito: false,
      error: error.message
    });
  }
};

exports.eliminarPersona = async (req, res) => {
  try {
    const persona = await Persona.findByIdAndDelete(req.params.id);

    if (!persona) {
      return res.status(404).json({
        exito: false,
        error: 'Persona no encontrada'
      });
    }

    res.status(200).json({
      exito: true,
      mensaje: 'Persona eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      error: error.message
    });
  }
};
