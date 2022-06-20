import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [ globalContext, setGlobalContext ] = useState({});
  
  return (
    <AppContext.Provider value={{ globalContext, setGlobalContext }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}