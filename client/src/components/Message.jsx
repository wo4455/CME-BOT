import React from 'react';

const Message = ({ message }) => { // message: data, ai
    return (
        <div className={`flex items-center ${!message.ai ? 'justify-end' : null}`}>
            { message.ai ? (
                <div className='relative w-10 h-10 overflow-hidden border-[1px] rounded-full border-black'>
                    <img src="https://picsum.photos/300" alt="Stock Image" class="w-full h-full rounded-full object-cover"></img>
                </div>
            ) : null} 
            <div className='bg-[#F5F5F5] rounded-md m-2 p-3 font-[Poppins] font-light max-w-96'>{message.text}</div>
        </div>
    );
};

export default Message;