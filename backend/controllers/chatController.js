const Chat = require('../models/Chat');
const User = require('../models/User');

// Send a message
const sendMessage = async (req, res) => {
  const { text } = req.body;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [req.userId, req.params.userId] },
    });

    if (!chat) {
      chat = new Chat({ participants: [req.userId, req.params.userId] });
    }

    chat.messages.push({ sender: req.userId, text });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get chat between two users
const getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      participants: { $all: [req.userId, req.params.userId] },
    }).populate('messages.sender', 'username');
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendMessage, getChat };