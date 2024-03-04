import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import useConverstion from "../../zustand/useConversation";

const SideChatBar = () => {
  const { selectedConverstion, setSelectedConverstion } = useConverstion();
  const { authUser, setauthUser } = useAuthContext();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  // console.log(selectedConverstion)
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/users/");
        setConversations(response.data);
      } catch (error) {
        console.log("error in fetching conversations:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

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

  if (success) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="rounded-lg p-2 flex flex-col gap-2">
      <div>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="divider divider-primary"></div>
      <div className="overflow-y-scroll mb-4">
        <ul className="menu bg-base-200 w-56 rounded-box overflow-y-scroll overflow-hidden">
          {loading ? (
            <p>Loading...</p>
          ) : (
            conversations.map((ele, key) => (
              <li onClick={()=>setSelectedConverstion(ele)} key={key} className={`border-b mb-1 ${selectedConverstion && selectedConverstion._id === ele._id ? "bg-blue-300 text-black" : ""}`}>
                <div className={'flex gap-4'}>
                  <div className="avatar offline">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={ele.profilePic} alt={`${ele.username} profile`} />
                    </div>
                  </div>
                  <h1 className="font-mono font-bold">{ele.username}</h1>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="divider divider-primary"></div>
      <button onClick={handleLogOut} className="btn btn-wide absolute bottom-2 left-1">
        Log Out
      </button>
    </div>
  );
};

export default SideChatBar;
