const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Endpoint para obtener los clientes
app.get('/clients', (req, res) => {
    const clients = [
        {
            "_id": "66f23a1f2ea5f144a23d0db3",
            "name": "Juan Pérez",
            "email": "juan@example.com",
            "phone": "1234567890",
            "address": "Calle Ejemplo 123",
            "createdAt": "2024-09-24T04:03:43.810Z",
            "updatedAt": "2024-09-24T04:03:43.810Z",
            "__v": 0
        },
        {
            "_id": "66f2259e56a87cdc21cdacac",
            "name": "Daner Bedoya",
            "email": "danerbedoya@gmail.com",
            "phone": "3112762618",
            "address": "Diagonal 43 # 34e20",
            "createdAt": "2024-09-24T02:36:14.223Z",
            "updatedAt": "2024-09-24T02:36:14.223Z",
            "__v": 0
        }
    ];
    res.json(clients);
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
