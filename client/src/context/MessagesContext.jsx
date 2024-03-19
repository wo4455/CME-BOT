import React from "react";
import { createContext, useContext, useState } from "react";

const MessagesContext = createContext();

export const useMessagesContext = () => useContext(MessagesContext);

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
