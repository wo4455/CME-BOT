import React from 'react';
import './App.css';

import Header from './components/Header';
import Display from './components/Display';
import Input from './components/Input';
import { MessagesProvider } from './context/MessagesContext';
import { LoadingProvider } from './context/LoadingContext';
import { InfoProvider } from './context/InfoContext';

const App = () => {
  return (
    <InfoProvider>
      <Header />
      <MessagesProvider>
        <LoadingProvider> 
            <div>
              <Display />
              <Input />
            </div>
        </LoadingProvider>
      </MessagesProvider>
    </InfoProvider>
  );
};

export default App;