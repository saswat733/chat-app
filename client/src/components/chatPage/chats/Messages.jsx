import React from "react";
import SingleMessage from "./SingleMessage";
import useConversation from "../../../zustand/useConversation";
import NoChats from "./NoChats";
import MessageErrorBoundary from "../../ErrorBoundary";

const Messages = () => {
  const { selectedConversation } = useConversation();

  if (!selectedConversation) {
    return <NoChats />;
  }

  return (
    <div className="space-y-4">
      <MessageErrorBoundary>
        <SingleMessage />
      </MessageErrorBoundary>
    </div>
  );
};

export default Messages;
