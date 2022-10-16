import { ChangeEvent, useEffect, useState } from 'react';
import Background from './Components/background/Background';
import Navbar from './Components/navbar/Navbar';

function App() {
  const [count, setCount] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/all')
      .then(r => r.text())
      .then(d => setCount(d));
  }, []);

  function onClick() {
    fetch('http://localhost:5000/add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: text }),
    });
    fetch('http://localhost:5000/all')
      .then(r => r.text())
      .then(d => setCount(d));
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <>
      <Navbar />
      {count}
      <input onChange={onChange} />
      <button onClick={onClick}>click</button>
      <Background />
    </>
  );
}

export default App;
