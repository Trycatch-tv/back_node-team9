// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuración de la aplicación
const app = express();
const port = process.env.PORT || 4000;

// Conexión a la base de datos de MongoDB
const dbURI =
  "mongodb+srv://admin:kPU0Dhg0S9ukhjHd@team9.uho1qgv.mongodb.net/test";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos...');
    })
    .catch((err) => {
        console.error(err);
    });

// Configuración de middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Definición del modelo de reserva
const reservaSchema = new mongoose.Schema({
    nombre: String,
    telefono: Number,
    correo: String,
    fecha: Date,
    hora: String,
    cantidad: Number
});

const Reserva = mongoose.model('Reserva', reservaSchema);

// Rutas
app.get('/reservas', async (req, res) => {
    const reservas = await Reserva.find();
    res.json(reservas);
});

app.post('/reservas', async (req, res) => {
    const reserva = new Reserva(req.body);
    await reserva.save();
    res.json({ status: 'Reserva guardada' });
});

app.put('/reservas/:id', async (req, res) => {
    const { id } = req.params;
    await Reserva.findByIdAndUpdate(id, req.body);
    res.json({ status: 'Reserva actualizada' });
});

app.delete('/reservas/:id', async (req, res) => {
    const { id } = req.params;
    await Reserva.findByIdAndDelete(id);
    res.json({ status: 'Reserva eliminada' });
});

// Iniciar la aplicación
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
