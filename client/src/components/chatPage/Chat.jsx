import React from "react";
import Messages from "./chats/Messages";
import MessageInput from "./chats/MessageInput";
import NoChats from "./chats/NoChats";

const Chat = () => {
  const noChatSelected=true;
  return (
    <div className="h-full w-full bg-blue-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
      <div className="rounded-lg">
        <div className="navbar bg-neutral text-neutral-content">
          <p>To:</p>
          <p className="btn btn-ghost text-xl">RadhaRaman</p>
        </div>
      </div>
      <div className="overflow-y-auto text-black max-h-[535px]">
       {
        (noChatSelected)?(<NoChats/>):(
          <>
        <Messages/>
        
      <div className="">

      <MessageInput/>
      </div>
      </>
        )
       }
      </div>
    </div>
  );
};

export default Chat;
