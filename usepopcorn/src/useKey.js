import { useEffect } from "react"


export function useKey(eventName, keyCode, handleEvent) {
   useEffect(() => {
      const callback = (e) => {
         if (e.code === keyCode) {
            handleEvent?.()
         }
      }
      document.addEventListener(eventName, callback)
      return () => {
         document.removeEventListener(eventName, callback)
      }
   }, [eventName, keyCode, handleEvent])
}