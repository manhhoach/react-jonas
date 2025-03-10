import { useState } from "react"

export default function AccordionItem({ item, order, isOpen, onOpen }) {
   return (
      <div className={`item ${isOpen ? 'open' : ''}`}>
         <p className="number">{order}</p>
         <p className="title" onClick={onOpen}>{item.title}</p>
         <p className="icon" onClick={onOpen}>{isOpen ? '-' : '+'}</p>
         {
            isOpen && <div className="content-box">
               {item.text}
            </div>
         }

      </div>
   )
}