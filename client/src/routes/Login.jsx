import React from 'react';
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { useState } from 'react';
import cmeLogo  from '../assets/cmebot_logo.png';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useInfoContext } from '../context/InfoContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setInfo } = useInfoContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      console.log(response);
      
      // // const token = response.headers.get('X-Auth-Token');
      response.headers.forEach((value, name) => {
        console.log(`${name}: ${value}`);
      });
      // // setInfo([username, token]);
      setUsername('');
      setPassword('');
      // // console.log('Login successful');
      // if (!response.ok) {
      //   setError(response.text);
      // };
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    };
    navigate('/');
  };

  return (
    <>
      <Header />
      <section className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:3/4 max-w-sm">
          <img
            src={cmeLogo}
            alt="Sample image"
          />
        </div>
        <form onSubmit={handleSubmit} className="md:w-1/3 max-w-sm">
          <div className="text-center md:text-left">
            <label className="mr-1">Sign in with</label>
            <button
              type="button"
              className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              <BiLogoFacebook
                size={20}
                className="flex justify-center items-center w-full"
              />
            </button>
            <button
              type="button"
              className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              <AiOutlineTwitter
                size={20}
                className="flex justify-center items-center w-full"
              />
            </button>
          </div>
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
              Or
            </p>
          </div>
          <input onChange={e => setUsername(e.target.value)}
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Username"
          />
          <input onChange={e => setPassword(e.target.value)}
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
          />
          {error ? (
            <p className='text-red-500 mt-2 text-left'>{error}</p>
          ) : null}
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don&apos;t have an account?{" "}
            <Link
              className="text-red-600 hover:underline hover:underline-offset-4"
              to={'/new'}
            >
              Register
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};


export default Login;