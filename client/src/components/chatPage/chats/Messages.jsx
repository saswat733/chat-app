import React from "react";
import SingleMessage from "./SingleMessage";

const Messages = () => {
  return (
    <div className="px-4 flex-1 overflow-auto">
    <div className="flex flex-col space-y-4 overflow-auto">
      <SingleMessage />
    </div>
  </div>
  );
};

export default Messages;
