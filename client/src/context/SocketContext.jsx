import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // Use environment variable for socket URL, defaulting to localhost for development
      const socketUrl =
        import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
      const newSocket = io(socketUrl, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      // Connection event handlers
      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      // Listen for online users
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
