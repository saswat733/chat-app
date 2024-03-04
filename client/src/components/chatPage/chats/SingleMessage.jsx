import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import useConverstion from "../../../zustand/useConversation";
import axios from 'axios'

const SingleMessage = () => {
  const { messages, setMessages, selectedConverstion } = useConverstion();
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for tracking errors

  // Function to format the timestamp into 12-hour format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // Handle midnight (0 hours)
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
  };

  useEffect(() => {
    const getAllMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/messages/${selectedConverstion._id}`);
        console.log(response.data);
        // Assuming the response.data is an array of messages
        setMessages(response.data);
      } catch (error) {
        console.log("error in getting messages", error.message);
        setError(error.message); // Set the error state
      } finally {
        setLoading(false);
      }
    };
    getAllMessages();
  }, [selectedConverstion?._id, setMessages]);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : error ? (
        <p>Error: {error}</p> // Display error message
      ) : (
        <>
          {messages.map((message, key) => (
            <div className="h-full" key={key}>
              <div className={`chat ${message.senderId === selectedConverstion._id ? 'chat-start' : 'chat-end'}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Profile Pic"
                      src={message.senderId === selectedConverstion._id ? selectedConverstion.profilePic : authUser.profilePic}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {message.senderId === selectedConverstion._id ? selectedConverstion.username : authUser.username}{" "}
                  <time className="text-xs opacity-50">{formatTime(message.createdAt)}</time> {/* Format the time */}
                </div>
                <div className={`chat-bubble ${message.senderId === selectedConverstion._id ? 'bg-red-400 text-black' : ''}`}>{message.message}</div>
                <div className="chat-footer opacity-50">{message.status}</div>
              </div>
            </div>
          ))}
          {!loading && messages.length === 0 && (
            <p className="text-justify uppercase m-auto ">send a message to start conversation</p>
          )}
        </>
      )}
    </>
  );
};

export default SingleMessage;
