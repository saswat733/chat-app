import axios from "axios";
import React from "react";
import {useState} from 'react'
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
const Login = () => {
   const [inputs, setinputs] = useState({
    username:"",
    password:"",
   })
   const [loading, setloading] = useState(false)
   const [error, seterror] = useState(false)
   const [success, setsuccess] = useState(false)
   const {setauthUser,authUser}=useAuthContext()
   const handleLogin=async(e)=>{
    e.preventDefault();
    setloading(true);
    // console.log(authUser)
    try {
      const response=await axios.post('/api/auth/login',{...inputs})
      // console.log(response.data);

      setauthUser(response.data)
      setsuccess(true);
      setloading(false);
    } catch (error) {
      console.log('error in login:',error.message)
      toast.error('Invalid Credentials!')
      seterror(true)
    }finally{
      toast.success('Logged In successfully!')
    }

   }
   if(success){
    return <Navigate to={'/chats'}/>
   }


  return (
    <div className="h-full overflow-hidden rounded-lg">
      <div className="glass h-full overflow-hidden">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl text-orange-600 font-bold">Login now!</h1>
              <p className="py-6">SAFE-SECURE-PRIVATE</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    value={inputs.username}
                    className="input input-bordered"
                    required
                    onChange={(e)=>setinputs({...inputs,username:e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    value={inputs.password}
                    required
                    onChange={(e)=>setinputs({...inputs,password:e.target.value})}
                  />
                  <label className="label">
                    <Link href="/" className="label-text-alt link link-hover">
                      Forgot password?
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  {
                    loading?(<span className="loading loading-dots loading-lg"></span>):(
                  <button className="btn btn-primary">Login</button>)
                  }
                </div>
                <div className="flex text-sm items-start">
                <p>Don't have an account?<Link className="text-blue-700 underline" to={'/signup'}>Sign Up</Link></p>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
