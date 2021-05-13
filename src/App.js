import { useAuth0 } from '@auth0/auth0-react';
import './styles/main.css';
import { Navbar } from './component/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProfilePage } from './pages/ProfilePage';

function App() {

  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div>Loading...</div>


  const loggedIn = (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
        </Switch>
      </Router>
    </>
  )
  return isAuthenticated ? loggedIn : <LoginPage />
}

export default App;
