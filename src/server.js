// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const chatRoutes = require('./routes/chatRoutes'); // Certifique-se de que está correto
const ChatController = require('./controllers/chatController'); // Certifique-se de que está correto

const app = express();
const PORT = process.env.PORT || 3000;

// Use o middleware express.json() para analisar o corpo da requisição
app.use(express.json()); // Aqui, substituímos bodyParser.json() pelo express.json()

// Use as rotas de chat
app.use('/chat', chatRoutes);

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/maluHubDB')
  .then(() => {
    console.log("Conexão com o MongoDB bem-sucedida!");
  })
  .catch(err => {
    console.error("Erro ao conectar com o MongoDB:", err);
  });

// Iniciar o cliente WhatsApp Web
const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp Web is ready!');
});

client.on('message', async (message) => {
    console.log('Mensagem recebida:', {
        body: message.body, // Exibe o conteúdo da mensagem
        type: message.type, // Exibe o tipo da mensagem
        timestamp: message.timestamp, // Exibe o timestamp
      });

  const participants = [message.from, message.to]; 
  let chat = await ChatController.findChatByParticipants(participants);

  if (!chat) {
    // Se não encontrar, cria uma nova conversa
    const leadName = message.from === 'seu_numero' ? 'Lead' : 'Você'; 
    chat = await ChatController.createChat({
      participants,
      leadName,
    });
  }

  // Formatando o timestamp corretamente
  const timestamp = new Date(message.timestamp * 1000);
  console.log('timestamp formatado:', timestamp);

  // Adiciona a mensagem ao banco de dados
  await ChatController.addMessageToChat(chat._id, {
    sender: message.from,
    content: message.body,
    timestamp: timestamp, // Passando o timestamp já formatado
  });
});

client.initialize();

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
