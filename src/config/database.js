// src/config/database.js
const mongoose = require('mongoose');

mongoose.set('strictQuery', true); // Configuración para evitar la advertencia de deprecación

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
