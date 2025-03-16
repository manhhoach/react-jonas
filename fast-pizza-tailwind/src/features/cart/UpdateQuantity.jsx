import { useDispatch } from 'react-redux'
import Button from './../../ui/Button'
import { increase, decrease } from './cartSlice'

export default function UpdateQuantity({ pizzaId, currentQuantity }) {
   const dispatch = useDispatch()
   return (
      <div className='flex gap-2 items-center md:gap-3'>

         <Button type="round" onClick={() => {
            dispatch(decrease(pizzaId))
         }}>-</Button>
         <span className='text-sm font-medium'>
            {currentQuantity}
         </span>
         <Button type="round" onClick={() => {
            dispatch(increase(pizzaId))
         }}>+</Button>
      </div>

   )
}