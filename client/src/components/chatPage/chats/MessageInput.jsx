import React, { useState, useRef, useEffect } from "react";
import useConversation from "../../../zustand/useConversation";
import { apiClient, retryRequest } from "../../../utils/apiClient";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../context/AuthContext";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const HandleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    const tempMessage = newMessage;
    setNewMessage(""); // Clear input immediately for better UX

    // Send message directly without optimistic updates for now
    try {
      const response = await retryRequest(() =>
        apiClient.post(`/api/messages/send/${selectedConversation._id}`, {
          message: tempMessage,
        })
      );

      // Simply add the new message to existing messages
      setMessages((prevMessages) => {
        const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
        return [...currentMessages, response.data];
      });
    } catch (error) {
      console.log("error in messaging:", error.message);
      toast.error("Failed to send message. Please try again.");
      setNewMessage(tempMessage); // Restore message on error
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "video/mp4",
      "audio/mpeg",
      "audio/mp3",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("File type not supported");
      return;
    }

    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await retryRequest(() =>
        apiClient.post(
          `/api/messages/send-file/${selectedConversation._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
      );

      // Add the file message to existing messages
      setMessages((prevMessages) => {
        const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
        return [...currentMessages, response.data];
      });

      toast.success("File sent successfully!");
    } catch (error) {
      console.log("error in file upload:", error.message);
      toast.error("Failed to send file. Please try again.");
    } finally {
      setUploadingFile(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    const input = inputRef.current;

    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newText =
        newMessage.slice(0, start) + emoji + newMessage.slice(end);
      setNewMessage(newText);

      // Set cursor position after emoji
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = start + emoji.length;
        input.focus();
      }, 0);
    } else {
      setNewMessage((prev) => prev + emoji);
    }

    // Don't close picker immediately for better UX
    // setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className="relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-16 left-0 z-50 shadow-lg border border-gray-200 rounded-lg bg-white"
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
            searchDisabled={false}
            skinTonesDisabled={false}
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,video/mp4,audio/mpeg,audio/mp3"
        />

        {/* File upload button */}
        <button
          type="button"
          onClick={triggerFileInput}
          disabled={uploadingFile || loading}
          className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send file"
        >
          {uploadingFile ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Message form */}
        <form
          onSubmit={HandleSendMessage}
          className="flex items-center space-x-2 flex-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={loading || uploadingFile}
          />

          {/* Emoji Button */}
          <button
            ref={emojiButtonRef}
            type="button"
            onClick={toggleEmojiPicker}
            disabled={loading || uploadingFile}
            className={`p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              showEmojiPicker
                ? "bg-yellow-300 text-yellow-700 focus:ring-yellow-500"
                : "bg-yellow-200 text-yellow-600 hover:bg-yellow-300 focus:ring-yellow-500"
            }`}
            title="Add emoji"
          >
            😊
          </button>

          <button
            type="submit"
            disabled={loading || !newMessage.trim() || uploadingFile}
            className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
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
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
