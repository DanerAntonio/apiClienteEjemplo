// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Configurar CORS para permitir el origen específico
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Cambia esto al origen de tu frontend
    methods: ['GET', 'POST', 'DELETE'], // Métodos permitidos
    credentials: true, // Permitir credenciales
};

// Habilitar CORS con la configuración
app.use(cors(corsOptions));
app.use(express.json()); // Para poder leer el cuerpo de las solicitudes en formato JSON

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB', err));

// Modelo de Cliente
const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
});
const Client = mongoose.model('Client', clientSchema);

// Endpoint para obtener clientes
app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint para agregar un cliente
app.post('/clients', async (req, res) => {
    const client = new Client(req.body);
    try {
        const savedClient = await client.save();
        res.status(201).json(savedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint para eliminar un cliente
app.delete('/clients/:id', async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
