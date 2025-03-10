import { useState } from "react";
import Item from './Item'

export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
   const [sortBy, setSortBy] = useState("input");
   let sortedItems;
   switch (sortBy) {
      case "input":
         sortedItems = [...items].sort((a, b) => a.id - b.id);
         break;
      case "description":
         sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
         break;
      case "packed":
         sortedItems = [...items].sort((a, b) => a.packed - b.packed);
         break;
      default:
         sortedItems = [...items];
   }


   return <div className="list">
      <ul >
         {sortedItems.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}></Item>)}
      </ul>
      <div className="actions">
         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input" key="">Sort by input order</option>
            <option value="description" key="">Sort by description</option>
            <option value="packed" key="">Sort by packed status</option>
         </select>
         <button onClick={() => onClearList()}>Clear list</button>
      </div>
   </div >

}