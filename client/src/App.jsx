import React from 'react';
import './App.css';
import Header from './components/Header';
import Display from './components/Display';
import Input from './components/Input';
import { MessagesProvider } from './context/MessagesContext';
import { LoadingProvider } from './context/LoadingContext';

const App = ({ userData, onLogout }) => {
  return (
    <>
      <Header userData={userData} onLogout={onLogout} />
      <MessagesProvider>
        <LoadingProvider> 
            <div>
              <Display userData={userData} />
              <Input />
            </div>
        </LoadingProvider>
      </MessagesProvider>
    </>
  );
};

export default App;