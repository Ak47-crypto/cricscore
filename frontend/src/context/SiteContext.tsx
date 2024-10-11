'use client'
import { createContext, useState,useContext, useEffect } from 'react';
import { IMatch } from '../Types/DataTypes';

interface MyContextProps {
  matchContextData:IMatch | undefined;
  strikerContext:string;
  nonStrikerContext:string;
  bowlerContext:string;
  matchState:number;
  setMatchContextData:(value:IMatch)=>void
  setStrikerContext:(value:string)=>void
  setNonStrikerContext:(value:string)=>void
  setBowlerContext:(value:string)=>void;
  setMatchState:React.Dispatch<React.SetStateAction<number>>;

}

const MyContext = createContext<MyContextProps | undefined>(undefined);



export const MyProvider=({children}:{children:React.ReactNode}) => {
 const [matchContextData,setMatchContextData]=useState<IMatch>();
 const [strikerContext,setStrikerContext]=useState<string>("")
 const [nonStrikerContext,setNonStrikerContext]=useState<string>("")
 const [bowlerContext,setBowlerContext]=useState<string>("")
 const [matchState,setMatchState]=useState<number>(0)

  useEffect(()=>{
    // setUserData(JSON.parse(localStorage.getItem("userData") as string))
    if(localStorage.getItem('matchId')){
      setMatchContextData(JSON.parse(localStorage.getItem('matchId') as string))
    }
    else{
      fetch('https://cricscore-eosin.vercel.app/api/fetchMatch',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          data:{
            matchId:"6702aeb2179635ea86796ca3"
          }
        })
      })
      .then((response)=>{return response.json()})
      .then((data)=>{
        if(data.statusCode===200)
        {
          const parseData=JSON.stringify(data.data)
          localStorage.setItem('matchId',parseData)
          setMatchContextData(data.data)
        }
      })
      .catch((err)=>{
        console.log(err+"err in siteContext fetch matchId")
      })
    }
  },[])
  return (
    <MyContext.Provider value={{matchContextData,strikerContext,nonStrikerContext,bowlerContext,matchState,setMatchContextData,setStrikerContext,setNonStrikerContext,setBowlerContext,setMatchState}}>
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