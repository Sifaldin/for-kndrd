import { useAuth0 } from '@auth0/auth0-react';
import './styles/main.css';
import { Navbar } from './component/Navbar';

function App() {

  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Navbar />

    </>
  );
}

export default App;
