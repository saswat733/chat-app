// Test component to verify store functionality
import React from "react";
import useConversation from "../../zustand/useConversation";

const StoreTest = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const testSelection = () => {
    const testContact = {
      _id: "test-id",
      fullName: "Test User",
      username: "testuser",
      profilePic: "https://via.placeholder.com/150",
    };
    setSelectedConversation(testContact);
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h3>Store Test</h3>
      <p>Selected: {selectedConversation?.fullName || "None"}</p>
      <button
        onClick={testSelection}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test Selection
      </button>
    </div>
  );
};

export default StoreTest;
