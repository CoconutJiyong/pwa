import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleMessageSend = () => {
    const phone = "821057385019";
    const message = "Send message 테스트입니다.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.location.href = url;
  };

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
          WeChat
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
      <button onClick={handleMessageSend}>
        <h3>Send to message</h3>
      </button>
    </>
  );
}

export default App;
