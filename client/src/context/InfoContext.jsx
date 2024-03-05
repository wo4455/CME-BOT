// InfoContext.jsx
import React, { createContext, useContext, useState } from 'react';

const InfoContext = createContext({
    info: [],
    setInfo: () => {}
});

export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
    const [info, setInfo] = useState([]);

    return (
        <InfoContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoContext.Provider>
    );
};
