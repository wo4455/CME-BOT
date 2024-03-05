import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { useMessagesContext } from '../context/MessagesContext';
import { useLoadingContext } from '../context/LoadingContext';
import { useInfoContext } from '../context/InfoContext';

const Display = () => {
    const messagesEndRef = useRef(null);
    const { messages } = useMessagesContext();
    const { isLoading } = useLoadingContext();
    const [messagesList, setMessagesList] = useState([{ text: 'Hello, how can I help you?', ai: true }]);
    const { info } = useInfoContext();

    useEffect(() => {
        if (messages && messages.length > 0) {
            setMessagesList(prevMessages => [...prevMessages, ...messages]);
        }
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const saveChats = async () => {
        try {
            const response = await fetch('http://localhost:3000/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: info[0], // first item is username
                    savedChats: messagesList,
                  }),
            });
            if (!response.ok) {
                throw new Error('Failed to save chats');
            }
            console.log('Chats saved successfully');
        } catch (error) {
            console.error(error);
            console.log(error.message);
        };
    };

    return (
        <div>
            <div className='z-10 my-10 top-36 left-60 flex flex-col w-2/3 h-96 m-auto py-3 px-6 bg-white rounded-md drop-shadow-lg overflow-y-auto'>
                {messagesList.map((item, index) => (
                    <div key={index} className={`animate__animated animate__fadeInUp animate__faster ${index === messagesList.length - 1 ? 'animate__delay-1s' : ''}`}>
                        <Message message={item} isLoading={isLoading} />
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <p>{info[1] ? info[1] : 'no token'}</p>

            {info[1] && <button onClick={saveChats}>Save Chats</button>} {/* Render the button only if user is logged in */}
        </div>
    );
};

export default Display;
