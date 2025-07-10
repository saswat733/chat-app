import { useEffect, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log("New message received:", newMessage); // Debug log

      // Play notification sound
      if (notificationRef.current) {
        notificationRef.current.play().catch((error) => {
          console.log("Could not play notification sound:", error);
        });
      }

      // Add new message to existing messages
      setMessages((prevMessages) => {
        const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];

        // Check if message already exists to prevent duplicates
        const messageExists = currentMessages.some(
          (msg) => msg._id === newMessage._id
        );
        if (messageExists) {
          console.log("Message already exists, skipping...");
          return currentMessages;
        }

        return [...currentMessages, newMessage];
      });
    };

    socket?.on("newMessage", handleNewMessage);

    // Cleanup function
    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, setMessages]); // Remove messages from dependency array

  return { notificationRef };
};

export default useListenMessages;
