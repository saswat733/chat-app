import React, { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import useConversation from "../../../zustand/useConversation";
import axios from "axios";
import { useSocketContext } from "../../../context/SocketContext";
import useListenMessages from "../../../hooks/useListenMessages";

const SingleMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { socket } = useSocketContext();
  const { notificationRef } = useListenMessages();

  // Function to format the timestamp into 12-hour format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12; // Handle midnight (0 hours)
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds} ${ampm}`;
  };

  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Function to get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType?.startsWith("image/")) {
      return "🖼️";
    } else if (fileType?.startsWith("video/")) {
      return "🎥";
    } else if (fileType?.startsWith("audio/")) {
      return "🎵";
    } else if (fileType?.includes("pdf")) {
      return "📄";
    } else if (fileType?.includes("word") || fileType?.includes("document")) {
      return "📝";
    } else {
      return "📎";
    }
  };

  // Function to render file content
  const renderFileContent = (message) => {
    if (!message.isFile || !message.fileInfo) {
      return message.message;
    }

    const { fileInfo } = message;
    const isImage = fileInfo.fileType?.startsWith("image/");
    const isVideo = fileInfo.fileType?.startsWith("video/");
    const isAudio = fileInfo.fileType?.startsWith("audio/");

    return (
      <div className="file-message">
        {isImage && (
          <div className="mb-2">
            <img
              src={fileInfo.url}
              alt={fileInfo.name}
              className="max-w-xs max-h-64 rounded-lg cursor-pointer hover:opacity-90"
              onClick={() => window.open(fileInfo.url, "_blank")}
            />
          </div>
        )}

        {isVideo && (
          <div className="mb-2">
            <video
              src={fileInfo.url}
              controls
              className="max-w-xs max-h-64 rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {isAudio && (
          <div className="mb-2">
            <audio src={fileInfo.url} controls className="w-full max-w-xs">
              Your browser does not support the audio tag.
            </audio>
          </div>
        )}

        <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg max-w-xs">
          <span className="text-2xl">{getFileIcon(fileInfo.fileType)}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {fileInfo.name}
            </p>
            <p className="text-xs text-gray-500">
              {formatFileSize(fileInfo.size)}
            </p>
          </div>
          <button
            onClick={() => window.open(fileInfo.url, "_blank")}
            className="p-1 text-indigo-600 hover:text-indigo-800"
            title="Download file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const lastMessage = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    const getAllMessages = async () => {
      if (!selectedConversation?._id) return;

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/api/messages/${selectedConversation._id}`
        );
        console.log(
          "Fetched messages for conversation:",
          selectedConversation._id,
          response.data
        );
        const messagesArray = Array.isArray(response.data) ? response.data : [];
        setMessages(messagesArray);
      } catch (error) {
        console.log("error in getting messages", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAllMessages();
  }, [selectedConversation?._id]);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : error ? (
        <p>Error: {error}</p> // Display error message
      ) : (
        <>
          {Array.isArray(messages) &&
            messages.map((message, key) => (
              <div
                ref={lastMessage}
                className={`h-full ${
                  message.senderId === selectedConversation._id
                    ? "chat-start shake"
                    : "chat-end"
                }`}
                key={key}
              >
                <div
                  className={`chat ${
                    message.senderId === selectedConversation._id
                      ? "chat-start"
                      : "chat-end"
                  }`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Profile Pic"
                        src={
                          message.senderId === selectedConversation._id
                            ? selectedConversation.profilePic
                            : authUser.profilePic
                        }
                      />
                    </div>
                    <audio
                      ref={notificationRef}
                      src="/src/assets/notification.mp3"
                    />
                  </div>
                  <div className="chat-header">
                    {message.senderId === selectedConversation._id
                      ? selectedConversation.username
                      : authUser.username}{" "}
                    <time className="text-xs opacity-50">
                      {formatTime(message.createdAt)}
                    </time>{" "}
                    {/* Format the time */}
                  </div>
                  <div
                    className={`chat-bubble ${
                      message.senderId === selectedConversation._id
                        ? "bg-red-400 text-black"
                        : ""
                    }`}
                  >
                    {renderFileContent(message)}
                  </div>
                  <div className="chat-footer opacity-50 flex items-center space-x-1">
                    {message.status === "sending" && (
                      <span className="text-xs text-gray-500 flex items-center">
                        <svg
                          className="animate-spin h-3 w-3 mr-1"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    )}
                    {message.status !== "sending" && message.status}
                  </div>
                </div>
              </div>
            ))}
          {!loading && (!Array.isArray(messages) || messages.length === 0) && (
            <p className="text-justify uppercase m-auto ">
              send a message to start conversation
            </p>
          )}
        </>
      )}
    </>
  );
};

export default SingleMessage;
