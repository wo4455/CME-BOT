import React from 'react';

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
                <div className='relative w-10 h-10 overflow-hidden border-[1px] rounded-full border-black'>
                    <img src="https://picsum.photos/300" alt="Stock Image" className="w-full h-full rounded-full object-cover" />
                </div>
            ) : null}
            <div className={`bg-[#F5F5F5] rounded-md m-2 p-3 font-[Poppins] font-light max-w-md ${isLoading ? 'animate-pulse' : ''}`}>{message.text}</div>
        </div>
    );
};

export default Message;
