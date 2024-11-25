const Fragancia = require('../models/fraganciaModel');

exports.obtenerFraganciaPorNombre = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const fragancia = await Fragancia.findOne({ nombre: new RegExp(`^${nombre}$`, 'i') });

    if (!fragancia) {
      return res.status(404).json({
        exito: false,
        error: 'Fragancia no encontrada'
      });
    }

    res.status(200).json({
      exito: true,
      datos: fragancia
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      error: error.message
    });
  }
};


exports.crearFragancia = async (req, res) => {
  try {
    const fragancia = new Fragancia(req.body);
    await fragancia.save();
    res.status(201).json({ exito: true, datos: fragancia, mensaje: 'Fragancia creada exitosamente' });
  } catch (error) {
    res.status(400).json({ exito: false, error: error.message });
  }
};

exports.obtenerFragancias = async (req, res) => {
  try {
    const filtros = req.query.nombre ? { nombre: new RegExp(req.query.nombre, 'i') } : {};
    const fragancias = await Fragancia.find(filtros);
    res.status(200).json({ exito: true, cantidad: fragancias.length, datos: fragancias });
  } catch (error) {
    res.status(500).json({ exito: false, error: error.message });
  }
};

exports.obtenerFraganciaPorId = async (req, res) => {
  try {
    const fragancia = await Fragancia.findById(req.params.id);
    if (!fragancia) return res.status(404).json({ exito: false, error: 'Fragancia no encontrada' });
    res.status(200).json({ exito: true, datos: fragancia });
  } catch (error) {
    res.status(500).json({ exito: false, error: error.message });
  }
};

exports.actualizarFragancia = async (req, res) => {
  try {
    const fragancia = await Fragancia.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!fragancia) return res.status(404).json({ exito: false, error: 'Fragancia no encontrada' });
    res.status(200).json({ exito: true, datos: fragancia, mensaje: 'Fragancia actualizada exitosamente' });
  } catch (error) {
    res.status(400).json({ exito: false, error: error.message });
  }
};

exports.eliminarFragancia = async (req, res) => {
  try {
    const fragancia = await Fragancia.findByIdAndDelete(req.params.id);
    if (!fragancia) return res.status(404).json({ exito: false, error: 'Fragancia no encontrada' });
    res.status(200).json({ exito: true, mensaje: 'Fragancia eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ exito: false, error: error.message });
  }
};
