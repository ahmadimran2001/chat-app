import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // getting message from user
    const { id: receiverId } = req.params; //getting receiver id i.e the logedin user
    const senderId = req.user._id; //getting senders id

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, // participants array cntails all these fields i.e semder id and receiver id
    });

    //if no previous conversation exists, we create a conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    //creating a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    //putting new message in message array
    if (message) {
      conversation.messages.push(newMessage._id);
    }

    //socket.io for realtime

    // await conversation.save();
    // await newMessage.save();

    //This will run in parallel, so less time taken
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (e) {
    console.log("Error in Send Message Controller", e.message);
    res.status(500).json({ error: "Internal Server ERROR" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //populate gives the actual messages instead of the references
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (e) {
    console.log("Error in Get Message Controller", e.message);
    res.status(500).json({ error: "Internal Server ERROR" });
  }
};
