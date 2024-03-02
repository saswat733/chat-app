import React from 'react'
import Chat from './Chat'
import SideChatBar from './SideChatBar'

const FullChatPage = () => {
  return (
    <div className='h-screen p-4 flex justify-center items-center relative'>
        <img src="https://st3.depositphotos.com/1010652/19073/v/450/depositphotos_190737044-stock-illustration-set-colorful-doodle-paper-background.jpg" alt="image" className='absolute -z-10 w-full h-screen '/>
        <div className=' flex h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 rounded-lg'>
        <SideChatBar/>
        <Chat/>

        </div>
    </div>
  )
}

export default FullChatPage