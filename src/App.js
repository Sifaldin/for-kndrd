import { useAuth0 } from '@auth0/auth0-react';
import './styles/main.css';
import { Navbar } from './component/Navbar';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';

function App() {

  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div>Loading...</div>

 


  return (
    !isAuthenticated ?
      <LoginPage />
    :
    <>
      <Navbar />
      <Home />

    </>
  );
}

export default App;
