import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState("");
  fetch("http://localhost:5001/asd")
    .then((resp) => resp.text())
    .then((t) => setCount(t));

  return (
    <div>
      yoyas
      <br />
      {count}
      <div className="dupa">sad</div>1<div className="daupaasd">asd</div>
      <div className="daupa">sadsadas</div>
      <div className="daupa">sad</div>
      <div className="daupa">sad </div>
    </div>
  );
}

export default App;
