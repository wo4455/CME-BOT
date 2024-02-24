import React from 'react';

const Subtitle = ({ otherStyles, data }) => {
  return (
    <p className={`text-xl text-dkBlue font-[Poppins] font-semibold ${otherStyles}`}>{data}</p>
  );
};

const Header = () => {
  return (
    <div className='bg-ltBlue flex justify-between items-center p-8 rounded-md mb-5 drop-shadow-xl w-full'>
        <Subtitle data={'logo'}/>
        <div>
          <h1 className='text-4xl font-bold text-dkBlue font-[Poppins]'>BOT NAME HERE</h1>
          <Subtitle data={'Powered by ChatGPT 4'}/>
        </div>
        <Subtitle data={'icon'}/>
    </div>
  );
};

export default Header;