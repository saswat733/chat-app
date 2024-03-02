import react from 'react'
import Login from './components/login/Login'
import Header from './components/header/Header'
import Home from './components/home/Home'
import SignUp from './components/signup/SignUp'
import FullChatPage from './components/chatPage/FullChatPage'
function App() {

  return (
    <>
    <div className='p-4 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5'>
      {/* <Home/> */}
      {/* <Login/> */}
      {/* <SignUp/> */}
      <FullChatPage/>
    </div>
    </>
  )
}

export default App