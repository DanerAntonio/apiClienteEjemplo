// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

const app = express();

// Habilitar CORS y soporte para JSON
app.use(cors());
app.use(express.json());

// Conectar a MongoDB usando Mongoose y la URL del archivo .env
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

// Definir el modelo de Cliente
const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Client = mongoose.model('Client', clientSchema);

// Endpoint para obtener todos los clientes
app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint para crear un nuevo cliente
app.post('/clients', async (req, res) => {
    const newClient = new Client(req.body);
    try {
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Endpoint para actualizar un cliente existente
app.put('/clients/:id', async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) return res.status(404).json({ message: "Cliente no encontrado" });
        res.json(updatedClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Endpoint para eliminar un cliente
app.delete('/clients/:id', async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) return res.status(404).json({ message: "Cliente no encontrado" });
        res.json({ message: "Cliente eliminado" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Iniciar el servidor usando el puerto definido en el archivo .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
