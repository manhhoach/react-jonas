import { useState } from "react"
import Input from "./Input"
import PercentSelect from "./PercentSelect"

const percentServices = [
   {
      value: 0,
      label: "Dissatisfied (0%)"
   },
   {
      value: 5,
      label: "It was okay (5%)"
   },
   {
      value: 10,
      label: "It was good (10%)"
   },
   {
      value: 20,
      label: "Absolutely amazing! (20%)"
   },
]

export default function TipCalculator() {
   const [originBill, setOriginBill] = useState(0)
   const [yourPercentService, setYourPercentService] = useState(0)
   const [friendPercentService, setFriendPercentService] = useState(0)
   const tipValue = Math.round(originBill * (yourPercentService + friendPercentService) / (2 * 100))
   const lastValue = tipValue + originBill

   function handleReset() {
      setOriginBill(0)
      setYourPercentService(0)
      setFriendPercentService(0)
   }

   return (
      <>
         <div>
            How much was the bill?
            <Input value={originBill} setOriginBill={setOriginBill} />
         </div>
         <div>
            How did you like the service?
            <PercentSelect value={yourPercentService} data={percentServices} setData={setYourPercentService}></PercentSelect>
         </div>
         <div>
            How did your friend like the service?
            <PercentSelect value={friendPercentService} data={percentServices} setData={setFriendPercentService}></PercentSelect>
         </div>
         <div>
            You pay ${lastValue} (${originBill} + ${tipValue})
         </div>

         <button onClick={() => handleReset()}>Reset</button>
      </>
   )
}