import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api').then(res => res.json()).then(data => setMessage(data.message))
  }, [])
  return (
    <div>{message} Hello</div>
  );
}

export default App;
