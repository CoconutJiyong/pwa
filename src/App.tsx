import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h2>
        <a href="kakaotalk://" target="_blank" rel="noopener noreferrer">
          KOKOKO
        </a>
      </h2>
      <h2>
        <a href="weixin://" target="_blank" rel="noopener noreferrer">
          Wechat
        </a>
      </h2>
      <h2>
        <a href="fb://" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
      </h2>
      <h2>
        <a href="instagram://" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </h2>
    </>
  );
}

export default App;
