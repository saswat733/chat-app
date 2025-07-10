import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SignUp from "./components/signup/SignUp";
import { Toaster } from "react-hot-toast";
import FullChatPage from "./components/chatPage/FullChatPage";
import { useAuthContext } from "./context/AuthContext";

// Helper component to check the current route
const RouteLayout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooterPaths = ["/login", "/signup", "/chats"];

  // Check if current path should hide header & footer
  const shouldHideHeaderFooter = hideHeaderFooterPaths.includes(
    location.pathname
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      {children}
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  const { authUser, setAuthUser } = useAuthContext();

  useEffect(() => {
    const storedAuthUser = localStorage.getItem("authUser");
    if (storedAuthUser) {
      setAuthUser(JSON.parse(storedAuthUser));
    }
  }, []);

  return (
    <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 flex flex-col">
      <Router>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <RouteLayout>
                <Home />
              </RouteLayout>
            }
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/chats" /> : <Login />}
          />
          <Route path="/chats" element={<FullChatPage />} />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/chats" /> : <SignUp />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
