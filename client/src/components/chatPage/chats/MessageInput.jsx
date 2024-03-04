import React, { useState } from "react";
import useConverstion from "../../../zustand/useConversation";
import axios from "axios";

const MessageInput = () => {
  const { messages, setMessages, selectedConverstion } = useConverstion();
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const HandleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send message API call
      const response = await axios.post(`/api/messages/send/${selectedConverstion._id}`, { message: newMessage });
      console.log(response.data); // Assuming the response contains the new message object
      setMessages([...messages, response.data]); // Update messages state with the new message
      setNewMessage(""); // Clear input field after sending message
    } catch (error) {
      console.log("error in messaging:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="px-4 my-3 absolute bottom-0 w-full">
      <div className="w-full flex items-center">
        <input
          type="text"
          placeholder="message..."
          value={newMessage}
          className="border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={HandleSendMessage} className="bg-gray-700 px-2 py-2 rounded-lg" disabled={loading}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="w-6 h-6"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
