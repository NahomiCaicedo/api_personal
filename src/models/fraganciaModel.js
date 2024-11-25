const mongoose = require('mongoose');

const fraganciaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  marca: {
    type: String,
    required: [true, 'La marca es obligatoria'],
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  descripcion: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  imagen: {
    type: String, // URL o ruta de la imagen
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Fragancia', fraganciaSchema);
