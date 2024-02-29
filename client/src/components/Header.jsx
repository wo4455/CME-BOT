import React from 'react';
import userLogo from '../assets/user-icon.png';
import cmeLogo from '../assets/cmebot_logo.png';

const Subtitle = ({ otherStyles, data }) => {
  return (
    <p className={`text-xl text-dkBlue font-[Poppins] font-semibold ${otherStyles}`}>{data}</p>
  );
};

const Header = () => {
  return (
    <div className='bg-ltBlue flex justify-between items-center p-6 rounded-md mb-5 drop-shadow-xl w-full'>
        <a href="#"><img className="w-16" src={cmeLogo} alt="CMEBOT Logo" /></a>
        <div>
          <h1 className='text-4xl font-bold text-dkBlue font-[Poppins]'>CME BOT</h1>
          <Subtitle data={'Powered by ChatGPT 4'}/>
        </div>
        <a href="#"><img src={userLogo} className='mt-6' alt="User Logo" /></a>
    </div>
  );
};

export default Header;