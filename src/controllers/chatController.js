const Chat = require('../models/chat');

// criar conversa
const createChat = async(req, res) => {
    const {participants, leadName} = req.body;

    try {
        const newChat = new Chat ({ participants, leadName});
        await newChat.save().
        res.status(201).json(newChat);
    }catch (err) {
        res.status(500).json({ message: ' erro ao criar conversa', error: err});
    }
};

// obter todas as conversas em andamento

const getActiveChats = async (req, res) => {
    try {
        const activeChats = await Chat.find({status: 'Em andamento'});
        res.status(200).json(activeChats);
    } catch (err) {
        res.status(500).json({message: 'erro ao buscar conversas ativas', error: err});
    }
};

//adicionar mensagem à conversa

const addMessageToChat = async (chatId, message) => {
    try {
        const chat = await chat.findById(chatId);
        if (chat){
            chat.mesages.push(message);
            await chat.save();
        }
    } catch (err){
        console.log('erro ao adicionar messagem:', err);
    }
};

const findChatByParticipants = async (participants) => {
    try {
      return await Chat.findOne({ participants });
    } catch (error) {
      console.error('Erro ao buscar chat:', error);
    }
  };

module.exports = {createChat, getActiveChats, addMessageToChat, findChatByParticipants};

