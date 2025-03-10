import { createContext, useContext, useReducer } from "react";

const initialState = {
   user: null,
   isAuthenticated: false
}

function reducer(state, action) {
   switch (action.type) {
      case 'login':
         return {
            ...state,
            user: action.payload,
            isAuthenticated: true
         }
      case 'logout':
         return initialState;
      default:
         throw new Error('not found case')
   }
}

const FAKE_USER = {
   name: "Jack",
   email: "jack@example.com",
   password: "12345678",
   avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext()

function AuthProvider({ children }) {

   const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

   function login(email, password) {
      if (email === FAKE_USER.email && password === FAKE_USER.password) {
         dispatch({ type: 'login', payload: FAKE_USER })
      }
   }

   function logout() {
      dispatch({ type: 'logout' })
   }

   return <AuthContext.Provider
      value={{
         user, isAuthenticated, login, logout
      }}>
      {children}
   </AuthContext.Provider>
}

function useAuth() {
   const ctx = useContext(AuthContext)
   return ctx;
}
export { AuthProvider, useAuth }