// src/app.js
// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');
const fraganciaRoutes = require('./routes/fraganciaRoutes');
const personaRoutes = require('./routes/personaRoutes');

const app = express();

// Conectar a MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas para ambas APIs
app.use('/api/fragancias', fraganciaRoutes);
app.use('/api/ejemplo', personaRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || '¡Algo salió mal!'
  });
});

module.exports = app;
