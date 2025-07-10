import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    // Validate input
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    // Find or create conversation efficiently
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create and save message
    const newMessage = new Message({
      senderId,
      receiverId,
      message: message.trim(),
    });

    // Save both in parallel for better performance
    const [savedMessage] = await Promise.all([
      newMessage.save(),
      Conversation.findByIdAndUpdate(
        conversation._id,
        { $push: { messages: newMessage._id } },
        { new: true }
      ),
    ]);

    // Send socket notification (don't wait for it)
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", savedMessage);
    }

    // Return response immediately
    res.status(201).json(savedMessage);
  } catch (error) {
    console.log("error in sendMessage controller:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatid } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatid] },
    }).populate("messages"); //not refrence but actual messages send krga

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessage controller:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const sendFileMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Debug: Log the file object to see what properties are available
    console.log("File object from multer:", req.file);

    // Find or create conversation efficiently
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create file message with proper file info handling
    const newMessage = new Message({
      senderId,
      receiverId,
      message: req.file.originalname || req.file.filename, // Use original filename as message
      isFile: true,
      fileInfo: {
        name: req.file.originalname || req.file.filename,
        size: req.file.size,
        fileType: req.file.mimetype,
        url: req.file.path, // Cloudinary URL from multer-storage-cloudinary
      },
    });

    // Save both in parallel for better performance
    const [savedMessage] = await Promise.all([
      newMessage.save(),
      Conversation.findByIdAndUpdate(
        conversation._id,
        { $push: { messages: newMessage._id } },
        { new: true }
      ),
    ]);

    // Send socket notification
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", savedMessage);
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    console.log("error in sendFileMessage controller:", error.message);
    res.status(500).json({
      error: "Failed to send file message",
    });
  }
};
