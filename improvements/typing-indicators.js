import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useTypingIndicator = () => {
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for typing events
    socket.on("userTyping", ({ userId, conversationId }) => {
      if (conversationId === selectedConversation?._id) {
        setTypingUsers((prev) => [
          ...prev.filter((id) => id !== userId),
          userId,
        ]);
      }
    });

    socket.on("userStoppedTyping", ({ userId, conversationId }) => {
      if (conversationId === selectedConversation?._id) {
        setTypingUsers((prev) => prev.filter((id) => id !== userId));
      }
    });

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [socket, selectedConversation]);

  const emitTyping = (conversationId) => {
    socket?.emit("typing", { conversationId });
  };

  const emitStoppedTyping = (conversationId) => {
    socket?.emit("stoppedTyping", { conversationId });
  };

  return {
    isTyping,
    typingUsers,
    emitTyping,
    emitStoppedTyping,
  };
};

export default useTypingIndicator;
