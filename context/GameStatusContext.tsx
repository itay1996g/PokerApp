// @/context/GameStatusContext

import React, { createContext, useState, useContext } from 'react';

export const GameStatusContext = createContext({
    isGameActive: false,
    setIsGameActive: (status: boolean) => {},
});

export const useGameStatus = () => useContext(GameStatusContext);

export const GameStatusProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isGameActive, setIsGameActive] = useState(false);

    return (
        <GameStatusContext.Provider value={{ isGameActive, setIsGameActive }}>
            {children}
        </GameStatusContext.Provider>
    );
};
