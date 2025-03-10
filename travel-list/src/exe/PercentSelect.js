export default function PercentSelect({ data, setData, value }) {
   return <select value={value} onChange={(e) => setData(Number(e.target.value))}>
      {
         data && data.map((e, i) => <option value={e.value} key={i}>{e.label}</option>)
      }

   </select>
}