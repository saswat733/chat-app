import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Add index for sender queries
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Add index for receiver queries
    },
    message: {
      type: String,
      required: true,
    },
    isFile: { type: Boolean, default: false },
    fileInfo: {
      name: { type: String },
      size: { type: Number },
      fileType: { type: String }, // Renamed from 'type' to avoid Mongoose conflict
      url: { type: String }, // Cloudinary URL for the file
    },
  },
  { timestamps: true }
);

// Add compound index for conversation queries
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

export const Message = mongoose.model("Message", messageSchema);
