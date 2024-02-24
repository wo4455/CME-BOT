import React from 'react';
import { useState, useEffect } from 'react';

import Message from './Message';
import { useMessagesContext } from '../context/MessagesContext';

const Display = () => { // get message objects (input and output) from Input.jsx
    const { messages } = useMessagesContext();
    const [ messagesList, setMessagesList ] = useState([{ 
        text: 'Hello, how can I help you?',
        ai: true
    }]);

    useEffect(() => {
        if (messages && messages.length > 0) { // checks if there are values in context
            setMessagesList(prevMessages => [...prevMessages, ...messages]); // adds context messages to messagesList
        }
    }, [messages]);

    return (
        <div className='z-10 border-4 my-10 top-36 left-60 flex flex-col w-2/3 h-96 m-auto py-3 px-6'>
            { messagesList.map((item, index) => (
                <Message message={item} key={item + index}/>
            )) }
        </div>
    );
};

export default Display;