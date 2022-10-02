import { useState } from 'react';
import Background from './Components/background/Background';
import Navbar from './Components/navbar/Navbar';

function App() {
  const [count, setCount] = useState('');

  return (
    <>
      <Navbar />
      <Background />
    </>
  );
}

export default App;
