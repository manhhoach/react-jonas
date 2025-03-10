export default function Input({ setOriginBill, value }) {
   return <input type="number" value={value} onChange={(e) => setOriginBill(Number(e.target.value))} />
}