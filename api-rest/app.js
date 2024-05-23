const express = require('express');
const cors = require("cors");
const app = express();
const routes = require('./routes');
require('dotenv').config();

// Habilitar CORS
app.use(cors());

app.use(express.json()); // Para procesar solicitudes en formato JSON
app.use(express.urlencoded({ extended: true })); // Para procesar solicitudes en formato x-www-form-urlencoded

// Usa las rutas definidas en routes/index.js
app.use('/api/'+process.env.APP_VERSION, routes);

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor Express escuchando en el puerto 3000');
});