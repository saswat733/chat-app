import React from "react";

const Hero = () => {
  return (
    <div className="mx-auto ">
      <div className="indicator">
        <span className="indicator-item badge badge-secondary" style={{margin:"15px"}}></span>
        <div className="grid p-4 m-4 rounded-lg bg-base-300 place-items-center">
          <div className="avatar indicator my-4">
            <span className="indicator-item badge badge-secondary">
              typing…
            </span>
            <div className="w-20 h-20 rounded-lg">
              <img
                alt="Tailwind CSS examples"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="hero bg-base-200">
            <div className="hero-content text-center">
              <div className="">
                <h1 className="text-5xl font-bold max-w-lg"><span className="text-orange-600">Connect</span> with your circle in a fun way!</h1>
                <p className="py-6 max-w-lg">
                  ChatiFy make your communication with relatives, work friends, family more fun. Stay connected with them with plenty of features.
                </p>
                <button className="btn btn-success">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
