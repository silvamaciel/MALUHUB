const mongoose = require('mongoose');

// Definindo o schema
const chatSchema = new mongoose.Schema({
  participants: [String], // Array de participantes (usuários)
  messages: [{
    sender: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
  }],
});

// Criando o modelo
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
