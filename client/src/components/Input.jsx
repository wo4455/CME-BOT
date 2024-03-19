import React from "react";
import { useState } from "react";

import { useMessagesContext } from "../context/MessagesContext";
import { useLoadingContext } from "../context/LoadingContext";

const Input = () => {
  const [input, setInput] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);

  const { setMessages } = useMessagesContext();
  const { setLoading } = useLoadingContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) throw new Error("Prompt is required. Say something!");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: input,
          conversationHistory: conversationHistory,
        }),
      });
      const data = await response.json(); // gets response from json format (set from backend)
      setMessages([
        // sets for context --> to be passed to display.jsx
        { text: input, ai: false },
        { text: data, ai: true },
      ]);
      setConversationHistory([
        // sets local state --> to be passed to backend for memory
        ...conversationHistory,
        { role: "user", content: input },
        { role: "assistant", content: data },
      ]);
      setInput("");
    } catch (err) {
      console.error("Error fetching data: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="w-2/3 h-24 m-auto drop-shadow-lg overflow-y-auto">
      <form className="w-full h-full flex items-center" onSubmit={handleSubmit}>
        <input
          className="flex-grow h-20 p-3 rounded-l-md min-h-18 font-[Poppins] text-lg"
          type="text"
          placeholder="Type here..."
          value={input}
          onChange={handleChange}
        />
        <button
          className="h-20 px-10 hover:opacity-90 rounded-r-md bg-ltBlue text-dkBlue font-[Poppins] text-lg font-semibold"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Input;
