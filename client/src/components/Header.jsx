import React from 'react';
import userLogo from '../assets/user-icon.png';

const Subtitle = ({ otherStyles, data }) => {
  return (
    <p className={`text-xl text-dkBlue font-[Poppins] font-semibold ${otherStyles}`}>{data}</p>
  );
};

const Header = () => {
  return (
    <div className='bg-ltBlue flex justify-between items-center p-6 rounded-md mb-5 drop-shadow-xl w-full'>
        <a href="#"><Subtitle data={'logo'}/></a>
        <div>
          <h1 className='text-4xl font-bold text-dkBlue font-[Poppins]'>CME BOT</h1>
          <Subtitle data={'Powered by ChatGPT 4'}/>
        </div>
        <a href="#"><img src={userLogo} alt="User Logo" /></a>
    </div>
  );
};

export default Header;