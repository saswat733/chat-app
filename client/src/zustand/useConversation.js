import { create } from "zustand";

const useConversation = create((set, get) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => {
    console.log("Setting selected conversation:", selectedConversation); // Debug log
    const currentState = get();

    // Only reset messages if we're switching to a different conversation
    const shouldResetMessages =
      currentState.selectedConversation?._id !== selectedConversation?._id;

    set({
      selectedConversation,
      messages: shouldResetMessages ? [] : currentState.messages,
    });
  },
  messages: [],
  setMessages: (messagesOrCallback) => {
    console.log(
      "setMessages called with:",
      typeof messagesOrCallback,
      messagesOrCallback
    ); // Debug log

    if (typeof messagesOrCallback === "function") {
      // Handle callback function
      const currentState = get();
      const currentMessages = Array.isArray(currentState.messages)
        ? currentState.messages
        : [];
      const newMessages = messagesOrCallback(currentMessages);
      const messagesArray = Array.isArray(newMessages) ? newMessages : [];

      console.log("Setting messages via callback:", messagesArray); // Debug log
      set({ messages: messagesArray });
    } else {
      // Handle direct value
      const messagesArray = Array.isArray(messagesOrCallback)
        ? messagesOrCallback
        : [];
      console.log("Setting messages directly:", messagesArray); // Debug log
      set({ messages: messagesArray });
    }
  },
  clearMessages: () => {
    console.log("Clearing messages"); // Debug log
    set({ messages: [] });
  },
}));

export default useConversation;
