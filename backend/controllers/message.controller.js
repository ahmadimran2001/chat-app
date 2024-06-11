import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, // participants array cntails all these fields i.e semder id and receiver id
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (message) {
      conservation.messages.push(newMessage._id);
    }

    res.status(201).json(newMessage);
  } catch (e) {
    console.log("Error in Send Message Controller", e.message);
    res.status(500).json({ error: "Internal Server ERROR" });
  }
};
