// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function CurrencyConvert() {
   const [value, setValue] = useState('');
   const [from, setFrom] = useState('USD');
   const [to, setTo] = useState('EUR');
   const [out, setOut] = useState(null);
   useEffect(() => {

      async function Convert() {
         if (!value || isNaN(value) || value <= 0) {
            return;
         }
         if (from === to) {
            setOut(value);
            return;
         }
         const controller = new AbortController()
         const res = await fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${from}&to=${to}`, { signal: controller.signal })
         const data = await res.json()
         setOut(data.rates[to])
         return () => controller.abort();

      }

      Convert()
   }, [value, from, to])

   return (
      <div>
         <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
         <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
         </select>
         <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
         </select>

         <p>{out != null ? `${out} ${to}` : ''}</p>
      </div>
   );
}
