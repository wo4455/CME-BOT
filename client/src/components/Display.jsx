import React from 'react';
import { useState, useEffect, useRef } from 'react';

import Message from './Message';
import { useMessagesContext } from '../context/MessagesContext';
import { useLoadingContext } from '../context/LoadingContext';

const Display = () => { // get message objects (input and output) from Input.jsx
    const messagesEndRef = useRef(null);
    const { messages } = useMessagesContext();
    const { isLoading } = useLoadingContext();
    const [ messagesList, setMessagesList ] = useState([{ 
        text: 'Hello, how can I help you?',
        ai: true
    }]);

    useEffect(() => {
        if (messages && messages.length > 0) { // checks if there are values in context
            setMessagesList(prevMessages => [...prevMessages, ...messages]); // adds context messages to messagesList
        }
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, [messagesList])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='z-10 border-4 my-10 top-36 left-60 flex flex-col w-2/3 h-96 m-auto py-3 px-6 overflow-y-auto'>
            { messagesList.map((item, index) => (
                <div key={index} className={`animate__animated animate__fadeInUp animate__faster ${index === messagesList.length - 1 ? 'animate__delay-1s' : ''}`}>
                    <Message message={item} isLoading={isLoading}/>
                </div>
            )) };
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Display;