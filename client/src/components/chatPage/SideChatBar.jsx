import React, { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const SideChatBar = () => {
  const { onlineUsers } = useSocketContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser, setauthUser } = useAuthContext();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/users/");
        setConversations(response.data);
        setFilteredConversations(response.data);
      } catch (error) {
        console.log("error in fetching conversations:", error.message);
        toast.error("Failed to load conversations");
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    // Scroll to top when search results change
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [filteredConversations]);

  const handleLogOut = async () => {
    try {
      await axios.get("/api/auth/logout");
      toast.success("Successfully Logged Out");
      setSuccess(true);
      localStorage.removeItem("chat-user");
      setauthUser("");
    } catch (error) {
      console.log("error in logOut:", error.message);
      toast.error("Error in Logging Out try again later!");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length === 0) {
      setFilteredConversations(conversations);
      return;
    }

    if (value.length < 3) return;

    const filtered = conversations.filter(
      (c) =>
        c.username.toLowerCase().includes(value.toLowerCase()) ||
        c.fullName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredConversations(filtered);
  };

  const handleContactClick = (contact) => {
    console.log("Contact clicked:", contact); // Debug log
    setSelectedConversation(contact);
    setIsMobileMenuOpen(false);
    setSearch("");
    setFilteredConversations(conversations);
  };

  if (success) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-indigo-600 text-white focus:outline-none hover:bg-indigo-700 transition-colors shadow-md"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-72 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white flex flex-col h-screen shadow-xl`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Header section */}
        <div className="p-4 space-y-4 border-b border-indigo-700">
          {/* User profile */}
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-indigo-700 bg-opacity-50">
            <div className="avatar online">
              <div className="w-12 rounded-full ring ring-indigo-400 ring-offset-base-100 ring-offset-2">
                <img
                  src={authUser.profilePic}
                  alt="User profile"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold truncate max-w-[160px]">
                {authUser.fullName}
              </h3>
              <p className="text-xs text-indigo-200 truncate max-w-[160px]">
                @{authUser.username}
              </p>
            </div>
          </div>

          {/* Search */}
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <input
              value={search}
              onChange={handleSearchChange}
              type="text"
              className="w-full p-3 pl-10 rounded-lg bg-indigo-700 bg-opacity-50 border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder-indigo-300"
              placeholder="Search contacts..."
              aria-label="Search contacts"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-indigo-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </form>
        </div>

        {/* Scrollable contacts list */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="px-4 py-2">
            <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-2 sticky top-0 bg-indigo-900 py-2 z-10">
              Contacts ({filteredConversations.length})
            </h3>

            {loading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-400"></div>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-indigo-200">
                {search.length >= 3
                  ? "No matching contacts found"
                  : "No contacts available"}
              </div>
            ) : (
              <div className="space-y-1 pb-2">
                {filteredConversations.map((contact) => {
                  const isOnline = onlineUsers.includes(contact._id);
                  const isSelected = selectedConversation?._id === contact._id;

                  return (
                    <div
                      key={contact._id}
                      onClick={() => handleContactClick(contact)}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-indigo-600"
                          : "hover:bg-indigo-700 hover:bg-opacity-50"
                      }`}
                    >
                      <div
                        className={`avatar ${isOnline ? "online" : "offline"}`}
                      >
                        <div className="w-10 rounded-full ring ring-indigo-400 ring-offset-base-100 ring-offset-2">
                          <img
                            src={contact.profilePic}
                            alt={contact.username}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="ml-3 min-w-0">
                        <p className="font-medium truncate">
                          {contact.fullName}
                        </p>
                        <p className="text-xs text-indigo-200 truncate">
                          @{contact.username}
                        </p>
                      </div>
                      {isOnline && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-green-400 flex-shrink-0"></span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer section */}
        <div className="p-4 border-t border-indigo-700">
          <button
            onClick={handleLogOut}
            className="w-full flex items-center justify-center p-3 rounded-lg bg-indigo-700 hover:bg-indigo-600 transition-colors text-white font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default SideChatBar;
