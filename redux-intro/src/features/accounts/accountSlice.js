import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
   balance: 0,
   loan: 0,
   loanPurpose: '',
   isLoading: false
}

const accountSlice = createSlice({
   name: 'account',
   initialState: initialStateAccount,
   reducers: {
      deposit(state, action) {
         state.balance += action.payload;
         state.isLoading = false;
      },
      withdraw(state, action) {
         state.balance -= action.payload;
      },
      requestLoan: {
         prepare(amount, purpose) {
            return {
               payload: {
                  amount,
                  loanPurpose: purpose
               }
            }
         },
         reducer(state, action) {
            if (state.loan > 0) {
               return;
            }
            state.loan = action.payload.amount;
            state.balance += action.payload.amount;
            state.loanPurpose = action.payload.loanPurpose;
         }
      },
      payLoan(state) {
         state.balance -= state.loan;
         state.loan = 0;
         state.loanPurpose = '';
      },
      converting(state) {
         state.isLoading = true;
      },
   }
})

export const { deposit, requestLoan, payLoan, withdraw } = accountSlice.actions
// export function deposit(amount, currency) {
//    if (currency === 'USD') {
//       return {
//          type: 'account/deposit',
//          payload: amount
//       }
//    }
//    return async function (dispatch, getState) {
//       dispatch({
//          type: 'account/converting'
//       })
//       const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`)
//       const data = await res.json()
//       const converted = data.rates['USD']
//       dispatch({
//          type: 'account/deposit',
//          payload: converted
//       })
//    }
// }

// const convertCurrency = createAsyncThunk('account/converting', async (amount, currency) => {
//    const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`)
//    const data = await res.json()
//    return data.rates['USD'];
// })

export default accountSlice.reducer