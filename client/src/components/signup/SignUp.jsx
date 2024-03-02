import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
const SignUp = () => {
  const {setauthUser}=useAuthContext()
  const [inputs, setinputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [success, setsuccess] = useState(false)
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(false)
  const handleSignUp = async (e) => {
    e.preventDefault();
    setloading(true)
    const fieldChecks=CheckField({...inputs});

    if(fieldChecks){

      try {
        const response=await axios.post("/api/auth/signup",{...inputs});
       const data=response.data
        setsuccess(true)

        //setting the data in local storage
        localStorage.setItem('chat-user',JSON.stringify(data))
        setauthUser(data)
      } catch (error) {
        toast.error("failed registration.");
        console.log("error in signup:", error);
        seterror(true)
      } finally {
        toast.success("registration done successfully!");
        setloading(false)
      }
    }
    else{
      toast.error('fill all the details correctly!')
      setloading(false)
    }
  };

  function CheckField({fullName,username,email,password,confirmPassword,gender}){
    if(!fullName||!username||!email||!password||!confirmPassword||!gender){
      return false;
    }
    if(password!=confirmPassword){
      toast.error("password and confirmPassword don't match")
      return false;
    }
    if(password.length<6){
      toast.error('password length must be greater than 6!')
      return false;
    }

    return true;
  }


  if(success){
    return <Navigate to={'/login'}/>
  }
  if(error){
    toast.error('Not able to register you!')
  }


  return (
    <div className="h-full rounded-lg">
      <div className="glass h-full rounded-lg">
        <div className="hero min-h-screen rounded-lg bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-center">
              <h1 className="text-5xl text-orange-600 font-bold">
                SignUp now!
              </h1>
              <p className="py-6">
                Welcome to SAFE-SECURE-PRIVATE chat app. Chat with your friends
                family and closed ones privately securely without any data
                leaks.
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSignUp}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="RaddhaRaman Singh"
                    className="input input-bordered"
                    value={inputs.fullName}
                    onChange={(e) =>
                      setinputs({ ...inputs, fullName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="sunny783"
                    className="input input-bordered"
                    value={inputs.username}
                    onChange={(e) =>
                      setinputs({ ...inputs, username: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="sunny@gmail.com"
                    className="input input-bordered"
                    value={inputs.email}
                    onChange={(e) =>
                      setinputs({ ...inputs, email: e.target.value })
                    }
                    required
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
                    onChange={(e) =>
                      setinputs({ ...inputs, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered"
                    value={inputs.confirmPassword}
                    onChange={(e) =>
                      setinputs({ ...inputs, confirmPassword: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <span className="label-text">Gender</span>
                  <div className="flex gap-8">
                    <div className="flex justify-center gap-2">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value={"male"}
                        onChange={(e) =>
                          setinputs({ ...inputs, gender: e.target.value })
                        }
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="flex justify-center gap-2">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value={"female"}
                        onChange={(e) =>
                          setinputs({ ...inputs, gender: e.target.value })
                        }
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                </div>

                <div className="form-control mt-6">
                  {
                    loading?(<span className="loading loading-dots loading-lg"></span>):(
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>)
                  
                  }
                </div>
                <p>
                  Already have an account?{" "}
                  <Link to={'/login'} className="text-blue-800 underline">
                    LogIn
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
