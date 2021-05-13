import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

export const Home = () => {

  const { user } = useAuth0();
  return (
    <div className={'home'}>
      <h1 className="home-name">
        Welcome {user?.name}!
        </h1>
    </div>
  )
}
