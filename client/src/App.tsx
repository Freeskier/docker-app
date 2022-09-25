import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState("")
  fetch('http://localhost:5001/asd')
  .then(resp => resp.text())
  .then(t => setCount(t))

  return (
    <div>
      yoyas
      <br/>
      {count}
    </div>
  )
}

export default App
