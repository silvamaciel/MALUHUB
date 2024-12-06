const express = require('express');

const { createChat, getActiveChats} = require ('../controllers/chatController');

const router = express.Router();

// rota para criar nova conversa

router.post('/chats', createChat);

router.get('/chats/active', getActiveChats)

module.exports = router;