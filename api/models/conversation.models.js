// Add this to your conversation model for better query performance
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

// Add index for faster participant queries
conversationSchema.index({ participants: 1 });

// Add compound index for specific participant combinations
conversationSchema.index({ "participants.0": 1, "participants.1": 1 });

export const Conversation = mongoose.model("Conversation", conversationSchema);
