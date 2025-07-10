import React from "react";
import { useAuthContext } from "../../../context/AuthContext";

const NoChats = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="max-w-md">
        <div className="p-4 bg-indigo-100 rounded-full inline-block mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {authUser.fullName}!
        </h1>
        <p className="text-gray-600 mb-6">
          Select a chat from the sidebar to start messaging or search for
          someone new to connect with.
        </p>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md">
          Start New Conversation
        </button>
      </div>
    </div>
  );
};

export default NoChats;
