import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <a onClick={() => logout()} className="menu-nav-link">
        <FontAwesomeIcon icon={faSignOutAlt} size={"lg"} />
      </a>
    )
  )
}
