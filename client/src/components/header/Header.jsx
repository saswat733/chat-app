import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="navbar bg-base-100 rounded-lg">
        <div className="navbar-start">
          <Link to={'/'} className="btn btn-ghost text-xl">ChatiFy</Link>
        </div>

        <div className="navbar-end">
          <Link to={'/login'} className="btn">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
