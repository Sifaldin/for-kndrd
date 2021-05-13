import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (

    !isAuthenticated && (
      <a onClick={() => loginWithRedirect()} className="menu-nav-link" >
     <FontAwesomeIcon icon={faSignInAlt} size={"lg"} />
      </a>
    )
  )
}
