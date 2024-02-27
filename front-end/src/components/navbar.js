import React from "react";

const Navbar = (props) => {
  return (
    <nav className="nav-container">
      <a href="#" className="site-name">Outreach</a>
      <ul className="navigation">
        <li><a href="/">Logout</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;