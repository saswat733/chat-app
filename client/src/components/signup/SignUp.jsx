import React from "react";

const SignUp = () => {
  function printGenderValue(e) {
    console.log(e);
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
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="RaddhaRaman Singh"
                    className="input input-bordered"
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
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="confim password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <span className="label-text">Gender</span>
                  <div className="flex gap-8">
                    <div className="flex justify-center gap-2">
                      <input
                        type="checkbox"
                        id="male"
                        name="gender"
                        value="male"
                        onClick={(e) => printGenderValue(e.target.value)}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="flex justify-center gap-2">
                      <input
                        type="checkbox"
                        id="female"
                        name="gender"
                        value="female"
                        onClick={(e) => printGenderValue(e.target.value)}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
                </div>
                <p>Already have an account? <a href="/" className="text-blue-800 underline">LogIn</a></p>
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
