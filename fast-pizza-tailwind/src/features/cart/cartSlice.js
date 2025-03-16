import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cart: [
   ],

}

const cartSlice = createSlice({
   name: 'cart',
   initialState: initialState,
   reducers: {
      addItem(state, action) {
         state.cart.push(action.payload)
      },
      deleteItem(state, action) {
         state.cart = state.cart.filter(e => e.pizzaId !== action.payload)
      },
      increase(state, action) {
         const item = state.cart.find(e => e.pizzaId === action.payload)
         item.quantity++;
         item.totalPrice = item.unitPrice * item.quantity;
      },
      decrease(state, action) {
         const item = state.cart.find(e => e.pizzaId === action.payload)
         item.quantity--;
         if (item.quantity === 0) {
            cartSlice.caseReducers.deleteItem(state, action)
         } else {
            item.totalPrice = item.unitPrice * item.quantity;
         }
      },
      clearCart(state, action) {
         state.cart = []
      }
   }
})

export const getTotalPrice = (state) => state.cart.cart.reduce((cur, next) => { return cur + next.totalPrice }, 0)

export const getTotalItem = (state) => state.cart.cart.reduce((cur, next) => { return cur + next.quantity }, 0)

export const getCart = (state) => state.cart.cart

export const getCurrentQuantity = id => {
   return (state) => state.cart.cart.find(e => e.pizzaId === id)?.quantity ?? 0
}

export const { addItem, deleteItem, increase, decrease, clearCart } = cartSlice.actions

export default cartSlice.reducer;