// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chatRoutes');
const ChatController = require('./controllers/chatController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(chatRoutes);

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost/whatsapp-chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Iniciar o cliente WhatsApp Web
const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp Web is ready!');
});

client.on('message', async (message) => {
  // Lógica para encontrar ou criar uma conversa
  const participants = [message.from, message.to];
  let chat = await ChatController.findChatByParticipants(participants);

  if (!chat) {
    // Se não encontrar, cria uma nova conversa
    chat = await ChatController.createChat({
      participants,
      leadName: message.from === 'seu_numero' ? 'Lead' : 'Você',
    });
  }

  // Adiciona a mensagem ao banco de dados
  ChatController.addMessageToChat(chat._id, {
    sender: message.from,
    content: message.body,
    timestamp: message.timestamp,
  });
});

client.initialize();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
