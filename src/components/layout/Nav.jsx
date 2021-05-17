import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import DropDownItem from "./dropdown-menu/DropDownItem";
import DropDownMenu from "./dropdown-menu/DropDownMenu";

export default function Nav({ user, onUpdateUser }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div>
          <Link to="/" onClick={closeMobileMenu}>
            <img className="navbar-logo" src={logo} alt="logo" />
          </Link>
        </div>

        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <div className="desktopSize">
            <li className="nav-item">
              <div className="nav-links">
                <Link
                  to="/feed"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Feed
                </Link>
              </div>
            </li>
          </div>
          <div className="phoneSize">
            <li className=" nav-item">
              <Link to="/feed" className="nav-links" onClick={closeMobileMenu}>
                Feed
              </Link>
            </li>
          </div>
          <li className="nav-item">
            <Link to="/new" className="nav-links" onClick={closeMobileMenu}>
              New Post
            </Link>
          </li>
        </ul>
        <div className="profile-icon">
          <DropDownItem
            icon={
              <img
                src={user?.imageUrl}
                alt="profile-pic"
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "20px",
                }}
              />
            }
          >
            <DropDownMenu user={user} onUpdateUser={onUpdateUser} />
          </DropDownItem>
          <div className="user-name">{user.name}</div>
        </div>
      </nav>
    </>
  );
}
