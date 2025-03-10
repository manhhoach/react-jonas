import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Stats from "./Stats";
import PackingList from "./PackingList";
import Accordion from "./Accordion";
import TipCalculator from "./exe/TipCalculator";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems)
  function handleAddItem(newItem) {
    setItems(prev => [...prev, newItem])

  }
  function handleDeleteItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }
  function handleToggleItem(id) {
    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, packed: !item.packed }
      }
      return item;
    })
    setItems(newItems)
  }
  function handleClearList() {
    setItems([])
  }


  const faqs = [
    {
      title: "Where are these chairs assembled?",
      text:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
    },
    {
      title: "How long do I have to return my chair?",
      text:
        "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
    },
    {
      title: "Do you ship to countries outside the EU?",
      text:
        "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
    }
  ];
  return (
    <div className="app">
      {/* <Logo></Logo>
      <Form onAddItem={handleAddItem}>
      </Form>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList}></PackingList>
      <Stats items={items}></Stats> */}
      {/* <Accordion data={faqs} /> */}

      <TipCalculator />
    </div>

  );
}








