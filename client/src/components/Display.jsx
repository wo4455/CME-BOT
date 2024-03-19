import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { useMessagesContext } from "../context/MessagesContext";
import { useLoadingContext } from "../context/LoadingContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Display = ({ userData }) => {
  const messagesEndRef = useRef(null);
  const { messages } = useMessagesContext();
  const { isLoading } = useLoadingContext();
  const [messagesList, setMessagesList] = useState([
    { text: "Hello, how can I help you?", ai: true },
  ]);
  const [saveCheckMark, setSaveCheckMark] = useState(false);
  const [loadCheckMark, setLoadCheckMark] = useState(false);
  const [deleteCheckMark, setDeleteCheckMark] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setMessagesList((prevMessages) => [...prevMessages, ...messages]);
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveChats = async () => {
    try {
      const response = await fetch("http://localhost:3000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          chatsToSave: messagesList,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save chats");
      } else {
        setSaveCheckMark(true);
        setTimeout(() => {
          setSaveCheckMark(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadChats = async () => {
    try {
      const response = await fetch("http://localhost:3000/load", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to load chats");
      } else {
        const loadedChats = await response.json();
        setMessagesList(loadedChats);
        setLoadCheckMark(true);
        setTimeout(() => {
          setLoadCheckMark(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteChats = async () => {
    setMessagesList([{ text: "Hello, how can I help you?", ai: true }]);
    setDeleteCheckMark(true);
    setTimeout(() => {
      setDeleteCheckMark(false);
    }, 1500);
  };

  const Button = ({ title, action, state, customStyles }) => {
    return (
      <li
        onClick={action}
        className={`p-6 cursor-pointer hover:bg-gray-500 transition-colors duration-300 ${customStyles}`}
      >
        <button className="text-white font-[Poppins]">{title} Chats</button>
        {state && (
          <span
            className={`check-mark show absolute ml-8 text-green-500 text-xl`}
          >
            &#10003;
          </span>
        )}
      </li>
    );
  };

  return (
    <>
      <div className="z-10 my-10 top-36 left-60 flex flex-col w-2/3 h-96 m-auto py-3 px-6 bg-white rounded-md drop-shadow-lg overflow-y-auto">
        {messagesList.map((item, index) => (
          <div
            key={index}
            className={`animate__animated animate__fadeInUp animate__faster ${
              index === messagesList.length - 1 ? "animate__delay-1s" : ""
            }`}
          >
            <Message message={item} isLoading={isLoading} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div
        className={`${userData.token ? "fixed" : "hidden"} bottom-8 right-8`}
      >
        <div
          onClick={() => setNavOpen(!navOpen)}
          className="flex items-center cursor-pointer hover:opacity-75"
        >
          <p className="font-[Poppins] mr-1 text-xl tracking-wider text-dkBlue font-semibold">
            MENU
          </p>
          {navOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        {navOpen && (
          <ul className="fixed right-8 bottom-16 w-[fit-content] h-[fit-content] bg-black bg-opacity-70 rounded-md">
            <Button
              title={"Load"}
              action={loadChats}
              state={loadCheckMark}
              customStyles={"border-b border-white"}
            />
            <Button
              title={"Save"}
              action={saveChats}
              state={saveCheckMark}
              customStyles={"border-b border-white"}
            />
            <Button
              title={"Clear"}
              action={deleteChats}
              state={deleteCheckMark}
            />
          </ul>
        )}
      </div>
    </>
  );
};

export default Display;
