import { combineReducers, createStore } from "redux";

const initialStateAccount = {
   balance: 0,
   loan: 0,
   loanPurpose: '',

}

const initialStateCustomer = {
   fullName: '',
   nationalId: '',
   createdAt: null
}


function accountReducer(state = initialStateAccount, action) {
   switch (action.type) {
      case "account/deposit":
         return {
            ...state,
            balance: state.balance + action.payload
         };
      case "account/withdraw":
         return {
            ...state,
            balance: state.balance - action.payload
         };
      case 'account/requestLoan':
         if (state.loan > 0) {
            return state
         }
         return {
            ...state,
            loan: action.payload.amount,
            loanPurpose: action.payload.loanPurpose
         }
      case 'account/payLoan':
         return {
            ...state,
            loan: 0,
            loanPurpose: '',
            balance: state.balance - state.loan
         }
      default:
         return state;
   }
}





function deposit(amount) {
   return {
      type: 'account/deposit',
      payload: amount
   }
}
function withdraw(amount) {
   return {
      type: 'account/withdraw',
      payload: amount
   }
}
function requestLoan(amount, loanPurpose) {
   return {
      type: 'account/requestLoan',
      payload: {
         amount, loanPurpose
      }
   }
}
function payLoan() {
   return {
      type: 'account/payLoan',
   }
}



function customerReducer(state = initialStateCustomer, action) {
   switch (action.type) {
      case 'customer/createCustomer':
         return {
            ...state,
            fullName: action.payload.fullName,
            nationalId: action.payload.nationalId,
            createdAt: action.payload.createdAt
         }
      case 'customer/updateName':
         return {
            ...state,
            fullName: action.payload
         }
      default:
         return initialStateCustomer
   }
}

function createCustomer(fullName, nationalId) {
   return {
      type: 'customer/createCustomer',
      payload: {
         fullName, nationalId, createdAt: new Date().toISOString()
      }
   }
}
function updateName(fullName) {
   return {
      type: 'customer/updateName',
      payload: fullName
   }
}

const rootReducer = combineReducers({
   account: accountReducer,
   customer: customerReducer
})

const store = createStore(rootReducer);
console.log(store.getState())
store.dispatch(deposit(500))
store.dispatch(createCustomer('manh', '1'))
console.log(store.getState())