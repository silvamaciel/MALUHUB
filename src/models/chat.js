const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: String,
    content: String,
    timestamp: { type: Date, default: Date.now}
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = chat;