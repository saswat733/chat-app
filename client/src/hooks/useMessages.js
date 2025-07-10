import { useEffect, useCallback } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const useMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();

  const fetchMessages = useCallback(async (conversationId) => {
    if (!conversationId) return [];

    try {
      const response = await axios.get(`/api/messages/${conversationId}`);
      const messagesArray = Array.isArray(response.data) ? response.data : [];
      console.log("Fetched messages:", messagesArray);
      return messagesArray;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  }, []);

  const addOptimisticMessage = useCallback(
    (message) => {
      setMessages((prevMessages) => {
        const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
        return [...currentMessages, message];
      });
    },
    [setMessages]
  );

  const replaceOptimisticMessage = useCallback(
    (tempId, realMessage) => {
      setMessages((prevMessages) => {
        const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
        return currentMessages.map((msg) =>
          msg._id === tempId ? realMessage : msg
        );
      });
    },
    [setMessages]
  );

  const removeOptimisticMessage = useCallback(
    (tempId) => {
      setMessages((prevMessages) => {
        const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
        return currentMessages.filter((msg) => msg._id !== tempId);
      });
    },
    [setMessages]
  );

  const loadMessagesForConversation = useCallback(
    async (conversationId) => {
      const fetchedMessages = await fetchMessages(conversationId);
      setMessages(fetchedMessages);
    },
    [fetchMessages, setMessages]
  );

  return {
    messages,
    addOptimisticMessage,
    replaceOptimisticMessage,
    removeOptimisticMessage,
    loadMessagesForConversation,
    selectedConversation,
  };
};

export default useMessages;
