import { useState, useEffect } from "react";


export function useLocalStorageState(inital, key) {
   const [data, setData] = useState(() => {
      return JSON.parse(localStorage.getItem(key)) || inital
   });

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(data))
   }, [data, key])
   return [data, setData]
}