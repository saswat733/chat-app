import React from "react";
import Chat from "./Chat";
import SideChatBar from "./SideChatBar";
import useConversation from "../../zustand/useConversation";
import NoChats from "./chats/NoChats";

const FullChatPage = () => {
  const { selectedConversation } = useConversation();

  console.log("FullChatPage - selectedConversation:", selectedConversation); // Debug log

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Always render, visibility controlled by SideChatBar component */}
      <SideChatBar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white lg:relative">
        {/* Mobile header */}
        <header className="lg:hidden bg-indigo-800 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold">
            {selectedConversation ? selectedConversation.fullName : "Chat App"}
          </h1>
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-hidden">
          {selectedConversation ? <Chat /> : <NoChats />}
        </div>
      </main>
    </div>
  );
};

export default FullChatPage;
