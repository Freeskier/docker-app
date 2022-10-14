import { useEffect, useState } from 'react';
import Background from './Components/background/Background';
import Navbar from './Components/navbar/Navbar';

function App() {
  const [count, setCount] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/all')
      .then(r => r.text())
      .then(d => setCount(d));
  }, []);

  return (
    <>
      <Navbar />
      {count}
      <Background />
    </>
  );
}

export default App;
