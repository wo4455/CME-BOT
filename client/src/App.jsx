import React from 'react';
import './App.css'
import { useState, useEffect } from 'react'

const App = () => {
  const [gptResponse, setGptResponse] = useState("");

  useEffect(() => {
    fetch('http://localhost:3000/res', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userMessage: 'Talk to me about CME CF Cryptocurrency Benchmarks.' }), // Adjust the prompt as needed
    })
    .then((res) => res.json())
    .then((data) => setGptResponse(data))
    .catch((err) => console.log(err));
  }, [gptResponse]);


  return (
    <div>
      {(gptResponse === "") ? (
        <h1 className='p-5'>Loading...</h1>
      ):
      <h1 className='p-5'>{gptResponse}</h1> }
      
    </div>
    
  )
};

export default App;