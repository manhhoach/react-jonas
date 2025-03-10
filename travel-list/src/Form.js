import { useState } from "react";

export default function Form({ onAddItem }) {
   const [description, setDescription] = useState()
   const [quantity, setQuantity] = useState(1)


   function handleSubmit(e) {
      e.preventDefault();
      const newItem = {
         description, quantity, packed: false, id: Date.now()
      }
      if (!description) {
         return;
      }
      onAddItem(newItem)
      setDescription('')
      setQuantity(1)

   }

   return <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
         {
            Array.from({ length: 20 }, (v, i) => {
               return <option value={i + 1} key={i + 1}>{i + 1}</option>
            })
         }
      </select>
      <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Item,..." />

      <button>Add</button>
   </form>
}