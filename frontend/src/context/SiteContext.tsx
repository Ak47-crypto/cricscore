'use client'
import { createContext, useState, ReactNode, FC,useContext, useEffect } from 'react';
import { IMatch } from '../Types/DataTypes';

interface MyContextProps {
  matchContextData:IMatch | undefined;
  setMatchContextData:(value:IMatch)=>void
}

const MyContext = createContext<MyContextProps | undefined>(undefined);



export const MyProvider=({children}:{children:React.ReactNode}) => {
 const [matchContextData,setMatchContextData]=useState<IMatch>()
  useEffect(()=>{
    // setUserData(JSON.parse(localStorage.getItem("userData") as string))

  },[])
  return (
    <MyContext.Provider value={{matchContextData,setMatchContextData}}>
      {children}
    </MyContext.Provider>
  );
};

export const useAppContext=()=>{
    const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider || its undefined');
  }
  return context;
}