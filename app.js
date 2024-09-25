// Seleccionar el formulario y la lista de clientes
const clientForm = document.getElementById('clientForm');
const clientList = document.getElementById('clientList');

// Función para agregar un cliente
async function addClient(clientData) {
    try {
        const response = await fetch('https://apiclienteejemplo.onrender.com/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
        });

        if (!response.ok) {
            throw new Error('Error al agregar cliente');
        }

        const newClient = await response.json();
        displayClient(newClient);
    } catch (error) {
        console.error('Error al agregar cliente:', error);
    }
}

// Función para mostrar el cliente en la lista
function displayClient(client) {
    const li = document.createElement('li');
    li.textContent = `${client.name} - ${client.email} - ${client.phone} - ${client.address}`;
    clientList.appendChild(li);
}

// Evento de envío del formulario
clientForm.onsubmit = (event) => {
    event.preventDefault();

    const clientData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
    };

    addClient(clientData);
    clientForm.reset(); // Limpiar el formulario
};

// Función para obtener todos los clientes (opcional)
async function fetchClients() {
    try {
        const response = await fetch('https://apiclienteejemplo.onrender.com/clients');
        const clients = await response.json();
        clients.forEach(displayClient);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
    }
}

// Llamar a fetchClients al cargar la página
fetchClients();
