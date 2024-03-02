import React from "react";

const MessageInput = () => {
  return (
    <form className="px-4 my-3 absolute bottom-0 w-full">
      <div className="w-ful flex items-center">
        <input
          type="text"
          placeholder="message..."
          className="border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
        />
        <button className="bg-gray-700 px-2 py-2 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          class="w-6 h-6"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
