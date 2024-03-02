import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'

const SingleMessage = () => {
  const {authUser}=useAuthContext()
  return (
    <div className='h-full'>
        <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src={authUser.profilePic} />
    </div>
  </div>
  <div className="chat-header">
    {authUser.username}
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">You were the Chosen One!</div>
  <div className="chat-footer opacity-50">
    Delivered
  </div>
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">
    Seen at 12:46
  </div>
</div>
    </div>
  )
}

export default SingleMessage