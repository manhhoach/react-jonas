import { useState } from "react"

export default function CountDay() {
   const [step, setStep] = useState(1)
   const [count, setCount] = useState(0)
   const date = new Date(new Date().setDate(new Date().getDate() + (step * count)))
   function handleReset() {
      setStep(1)
      setCount(0)
   }
   return (
      <>
         <div>
            <input
               type="range"
               step="1"
               value={step}
               onChange={(e) => setStep(+e.target.value)}
               style={{ width: "300px" }}
            />
            Step: {step}
         </div>
         <div>
            <button onClick={() => setCount(count - 1)}>-</button>
            <input type="number" value={count} onChange={(e) => setCount(+e.target.value)} />
            <button onClick={() => setCount(count + 1)}>+</button>
         </div>

         {step * count} days from today is {date.toDateString()}
         {
            step * count != 0 && <div>
               <button onClick={handleReset}>
                  Reset
               </button>
            </div>
         }

      </>
   )
}