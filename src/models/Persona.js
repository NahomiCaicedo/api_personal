// models/Persona.js
const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true
  },
  edad: {
    type: Number,
    required: [true, 'La edad es obligatoria'],
    min: [0, 'La edad no puede ser negativa']
  },
  contacto: {
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    telefono: {
      type: String,
      trim: true
    },
    direccion: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Persona', personaSchema);