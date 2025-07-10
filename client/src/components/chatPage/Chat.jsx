import React from "react";
import Messages from "./chats/Messages";
import MessageInput from "./chats/MessageInput";
import NoChats from "./chats/NoChats";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Chat = () => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  // Don't render if no conversation is selected
  if (!selectedConversation) {
    return <NoChats />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center shadow-sm">
        <div className="avatar online">
          <div className="w-10 rounded-full ring ring-indigo-400 ring-offset-base-100 ring-offset-2">
            <img
              src={selectedConversation.profilePic}
              alt={selectedConversation.fullName}
            />
          </div>
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-gray-800">
            {selectedConversation.fullName}
          </h2>
          <p className="text-xs text-gray-500">
            @{selectedConversation.username}
          </p>
        </div>
        <div className="ml-auto flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <Messages />
      </div>

      {/* Message input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
