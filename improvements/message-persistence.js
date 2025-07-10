import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useConversation = create(
  persist(
    (set, get) => ({
      selectedConversation: null,
      setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation }),
      messages: [],
      setMessages: (messages) => set({ messages }),
      messageCache: {},

      // Cache messages for conversations
      cacheMessages: (conversationId, messages) => {
        set((state) => ({
          messageCache: {
            ...state.messageCache,
            [conversationId]: messages,
          },
        }));
      },

      // Get cached messages
      getCachedMessages: (conversationId) => {
        return get().messageCache[conversationId] || [];
      },

      // Add message to cache
      addMessageToCache: (conversationId, message) => {
        set((state) => ({
          messageCache: {
            ...state.messageCache,
            [conversationId]: [
              ...(state.messageCache[conversationId] || []),
              message,
            ],
          },
        }));
      },
    }),
    {
      name: "conversation-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messageCache: state.messageCache,
      }),
    }
  )
);

export default useConversation;
