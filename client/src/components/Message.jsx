import React from 'react';
import cmePfp from '../assets/cmebot_pfp.png';

const LoadingDot = () => {
    return (
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
    );
};

const Message = ({ message, isLoading }) => {
    return (
        <div className={`flex items-center ${!message.ai ? 'justify-end' : null}`}>
            {isLoading ? (
                <div className="flex items-center space-x-2">
                    <LoadingDot />
                    <LoadingDot />
                    <LoadingDot />
                </div>
            ) : message.ai ? (
                <div className='relative w-10 h-10 overflow-hidden rounded-full'>
                    <img src={cmePfp} alt="Stock Image" className="mt-2 w-11/12 h-11/12 rounded-full object-cover" style={{ objectFit: 'cover' }}/>
                </div>
            ) : null}
            <div className={`bg-[#F5F5F5] rounded-md m-2 p-3 font-[Poppins] font-light max-w-md ${isLoading ? 'animate-pulse' : ''}`}>{message.text}</div>
        </div>
    );
};

export default Message;
