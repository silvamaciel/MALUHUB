const express = require('express');
const mongoose = require('mongoose');
const {client} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const PORT = processo.env.PORT || 3000;

// conectar ao mongoose

mongoose.connect('mongodb://localhost/whatsapp-chat', {

    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('mongoDB Connected'))
.catch (err => console.log('mongoDB connection error:', err));

// iniciar cliente whatsapp web

const client = new client();

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('whatsapp web is ready!');
});

client.on('message', async (message) => {
    // Lógica para processar mensagens
    console.log('Received message:', message.body);
    // Aqui, você pode armazenar as mensagens no MongoDB ou realizar outra lógica
  });

  client.initialize();

// Rota para teste
app.get('/', (req, res) => {
  res.send('WhatsApp Chat System');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});