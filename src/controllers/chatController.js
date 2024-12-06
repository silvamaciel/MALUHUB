// src/controllers/chatController.js
const Chat = require('../models/Chat'); // Supondo que você tenha um modelo de Chat

// Função para encontrar um chat com base nos participantes
async function findChatByParticipants(participants) {
  try {
    // Procurando o chat onde os participantes correspondem aos dados
    return await Chat.findOne({ participants: { $all: participants } });
  } catch (err) {
    console.error('Erro ao buscar chat:', err);
    return null;
  }
}

// Função para criar um novo chat
async function createChat({ participants, leadName }) {
  try {
    // Criando um novo chat no banco de dados com os dados fornecidos
    const chat = new Chat({
      participants,
      leadName,
      messages: [],
    });

    return await chat.save();
  } catch (err) {
    console.error('Erro ao criar chat:', err);
    throw err;
  }
}

// Função para adicionar uma mensagem a um chat existente
async function addMessageToChat(chatId, message) {
    try {
        // Encontrar o chat pelo _id
        const chat = await Chat.findById(chatId);
    
        if (chat) {
          // Adicionar a nova mensagem ao array de mensagens
          chat.messages.push(message); // Corrigido para usar o parâmetro correto
    
          // Salvar o chat com a nova mensagem
          await chat.save();
          console.log('Mensagem adicionada ao chat com sucesso!');
        } else {
          console.log('Chat não encontrado!');
        }
      } catch (error) {
        console.error('Erro ao adicionar mensagem:', error);
      }
}

module.exports = {
  findChatByParticipants,
  createChat,
  addMessageToChat,
};
