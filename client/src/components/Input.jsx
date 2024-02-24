import React from 'react'
import { useState } from 'react';

import { useMessagesContext } from '../context/MessagesContext';

const Input = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setMessages } = useMessagesContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) throw new Error("Prompt is required. Say something!");
    setIsLoading(true);
    try { 
      const response = await fetch('http://localhost:3000/res', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: input }),
      });
      const data = await response.json(); // gets response from json format (set from backend)
      setMessages([
        { text: input, ai: false },
        { text: data, ai: true }
      ]);
      setInput('');
    } catch (err) {
      console.error("Error fetching data: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  return (
    <div>
        {/* {isLoading ? (
          <h1 className='p-5'>Loading...</h1>
        ) : gptResponse ? (
          <h1 className='p-5'>{gptResponse}</h1>
        ) : null} */}

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='type here...' value={input} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default Input;