import { useState } from "react";
import AccordionItem from "./AccordionItem";

export default function Accordion({ data }) {
   const [currentTitle, setCurrentTitle] = useState(null)
   function handleOpen(title) {
      setCurrentTitle(prevTitle => prevTitle === title ? null : title);
   }
   return (
      <div className="accordion">
         {data.map((e, i) => <AccordionItem isOpen={e.title === currentTitle} key={i} onOpen={() => handleOpen(e.title)} item={e} order={i + 1}></AccordionItem>)}
      </div>
   )
}