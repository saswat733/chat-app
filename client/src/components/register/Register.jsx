import React,{useState} from 'react'

const Register = () => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
  return (
    <div className='flex justify-center items-center h-screen bg-blue-300 '>
        <form className='flex flex-col gap-4 w-72'>
            <input  className='p-2 text-center rounded-lg w-full' type="text" placeholder='username' onChange={(e)=>setusername(e.target.value)} />
            <input className='p-2 text-center rounded-lg w-full' type="password" placeholder='password' onChange={(e)=>setpassword(e.target.value)} />
            <button className='bg-blue-700 rounded-lg p-1'>Register</button>
        </form>
    </div>
  )
}

export default Register