import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // Load count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem("repCount");
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
  }, []);

  // Save count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("repCount", count);
  }, [count]);

  return (
    <div className="app">
      <h1>🏋️ Rep Counter</h1>
      <div className="counter">{count}</div>
      <div className="buttons">
        <button onClick={() => setCount(count - 1)} disabled={count <= 0}>
          ➖ Decrease
        </button>
        <button onClick={() => setCount(count + 1)}>➕ Increase</button>
        <button onClick={() => setCount(0)} className="reset">
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default App;
