import React from 'react';
import './App.css'

import Header from './components/Header';
import Display from './components/Display';
import Input from './components/Input';
import { MessagesProvider } from './context/MessagesContext';

const App = () => {
  return (
    <>
      <Header />
      <MessagesProvider>
        <div>
          <Display />
          <Input />
        </div>
      </MessagesProvider>
    </>
  );
};

export default App;