// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');

// Exemplo de rota GET para listar chats
router.get('/', async (req, res) => {
  try {
    const chats = await ChatController.getAllChats(); // Exemplo de método para buscar todos os chats
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar chats', error: err });
  }
});

// Exemplo de rota POST para criar um chat
router.post('/', async (req, res) => {
  try {
    const { participants, leadName } = req.body;
    const newChat = await ChatController.createChat({ participants, leadName });
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar chat', error: err });
  }
});

module.exports = router;
