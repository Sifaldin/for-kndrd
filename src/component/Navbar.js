import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import logo from '../resources/logo.jpg'


export const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);
  const { user, isLoading } = useAuth0();

  const toggleMenu = () => {
    setShowMenu(prevState => !prevState);
  }

  return (
    <header>

      <div className={'menu-logo'}>
        <img src={logo} id='logo' />
      </div>

      <div className={`menu-btn ${showMenu ? "open" : ""}`} onClick={toggleMenu} >
        <span className={`menu-btn-burger ${showMenu ? "open" : ""}`}> </span>
      </div>

      <nav className={showMenu ? "open" : ""}>
        <ul className={`menu-nav ${showMenu ? "open" : ""}`}>
          <li className={`menu-nav-item ${showMenu ? "open" : ""}`}>
            <a className="menu-nav-link">Home</a>
          </li>
          <li className={`menu-nav-item  ${showMenu ? "open" : ""}`}>
            <a className="menu-nav-link">Profile</a>
          </li>
          <li className={`menu-nav-item ${showMenu ? "open" : ""}`}>
            <a className="menu-nav-link">Feed</a>
          </li>
          {
            user && !isLoading && <li className={`menu-nav-item ${showMenu ? "open" : ""}`}>

              <LogoutButton />

            </li>
          }
        </ul>
      </nav>
    </header>
  )
}
