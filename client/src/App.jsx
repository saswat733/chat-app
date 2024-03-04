import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignUp from './components/signup/SignUp';
import Chat from './components/chatPage/Chat';
import {Toaster} from 'react-hot-toast'
import FullChatPage from './components/chatPage/FullChatPage';
import { useAuthContext } from './context/AuthContext';
function App() {
  const {authUser}=useAuthContext()
  // console.log(authUser)
  return (
    <>
      <div className='p-4 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 flex flex-col gap-12 md:gap-20 '>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={authUser?(<Navigate to={'/chats'}/>):(<Login />)} />
          <Route path="/chats" element={<FullChatPage/>}/>
          <Route path="/signup" element={authUser?(<Navigate to={'/chats'}/>):(<SignUp />)} />
        </Routes>
        <Toaster/>
        <Footer/>
      </Router>
      </div>
    </>
  );
}

export default App;
