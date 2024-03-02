import React from "react";

const Header = () => {
  return (
    <div>
      <div className="navbar bg-base-100 rounded-lg">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">ChatiFy</a>
        </div>

        <div className="navbar-end">
          <a className="btn">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
