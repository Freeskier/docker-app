import { useState } from 'react';
import reactLogo from './assets/react.svg';
import styles from './app.module.scss';
import Particles from './Components/particles/Particles';
import Waves from './Components/waves/Waves';

function App() {
  const [count, setCount] = useState('');

  return (
    <div className={styles.container}>
      <Particles />
      <Waves />
    </div>
  );
}

export default App;
