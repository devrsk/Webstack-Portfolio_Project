import React from "react";
import logo from "../assets/images/propertypro.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="PropertyPro" />
      </div>
      <nav className="menu">
        <ul>
          <li>
            <a href="/category/sell">Selling</a>
          </li>
          <li>
            <a href="/category/rent">Renting</a>
          </li>
	<li>
            <a href="/contactus">Contact Us</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
