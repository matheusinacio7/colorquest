import { createContext, useState, ReactNode } from 'react';

interface IUserContext {
  currentExp: number,
  currentLevel: {level: number, minExp: number, maxExp: number},
  loseGame: () => void,
  winGame: () => void,
}

export const UserContext = createContext({} as IUserContext);

export function UserProvider( props: {children: ReactNode} ) {
  const [currentExp, setCurrentExp] = useState(0);
  const [currentLevel, setCurrentLevel] = useState({level: 1, minExp: 0, maxExp: 100})

  function loseGame() {
    setCurrentExp(previous => Math.max(previous - 35, 0));
    console.log('lost');
  }

  function winGame() {
    setCurrentExp(previous => Math.min(previous + 35, 100));
    console.log('won');
  }
  
  return(
    <UserContext.Provider value={{
      currentExp,
      currentLevel,
      loseGame,
      winGame,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}