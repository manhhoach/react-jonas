import { createContext, useContext, useEffect, useReducer, useState } from "react";
const BASE_URL = `http://localhost:8000`
const CitiesContext = createContext()


const initialState = {
   cities: [],
   isLoading: true,
   currentCity: {},
   error: ""
}

const ACTIONS = {
   GET_CITIES: 'GET_CITIES',
   CREATE_CITY: 'CREATE_CITY',
   DELETE_CITY: 'DELETE_CITY',
   GET_CURRENT_CITY: 'GET_CURRENT_CITY',
   LOADING: 'LOADING',
   REJECTED: 'REJECTED'
}

function reducer(state, action) {
   switch (action.type) {
      case ACTIONS.LOADING:
         return {
            ...state, isLoading: true
         }
      case ACTIONS.GET_CITIES:
         return {
            ...state,
            isLoading: false,
            cities: action.payload
         }
      case ACTIONS.GET_CURRENT_CITY:
         return {
            ...state,
            isLoading: false,
            currentCity: action.payload
         }
      case ACTIONS.CREATE_CITY:
         return {
            ...state,
            isLoading: false,
            cities: [...state.cities, action.payload],
            currentCity: action.payload
         }
      case ACTIONS.DELETE_CITY:
         return {
            ...state,
            isLoading: false,
            cities: state.cities.filter(e => e.id !== action.payload),
            currentCity: {}
         }
      case ACTIONS.REJECTED:
         return {
            ...state,
            error: action.payload,
            isLoading: false
         }
      default:
         throw new Error('not found case')
   }
}

function CitiesProvider({ children }) {
   const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

   useEffect(function () {
      async function fetchCities() {
         try {
            dispatch({ type: ACTIONS.LOADING })
            const res = await fetch(`${BASE_URL}/cities`);
            const data = await res.json();
            dispatch({ type: ACTIONS.GET_CITIES, payload: data })
         }
         catch {
            dispatch({ type: ACTIONS.REJECTED, payload: 'Can not fetch cities list' })
         }
      }
      fetchCities()
   }, [])

   async function getCity(id) {
      try {
         if (id == currentCity.id) {
            return
         }
         dispatch({ type: ACTIONS.LOADING })
         const res = await fetch(`${BASE_URL}/cities/${id}`);
         const data = await res.json();
         dispatch({ type: ACTIONS.GET_CURRENT_CITY, payload: data })
      }
      catch {
         dispatch({ type: ACTIONS.REJECTED, payload: 'Can not get city with id ' + id })
      }
   }

   async function createCity(newCity) {
      try {
         dispatch({ type: ACTIONS.LOADING })
         const res = await fetch(`${BASE_URL}/cities`, {
            method: 'POST',
            body: JSON.stringify(newCity),
            headers: {
               'Content-Type': 'application/json'
            }
         });
         const data = await res.json();
         dispatch({ type: ACTIONS.CREATE_CITY, payload: data })

      }
      catch {
         dispatch({ type: ACTIONS.REJECTED, payload: 'Can not create this city' })
      }
   }

   async function deleteCity(id) {
      try {
         dispatch({ type: ACTIONS.LOADING })
         await fetch(`${BASE_URL}/cities/${id}`, {
            method: 'DELETE'
         });
         dispatch({ type: ACTIONS.DELETE_CITY, payload: id })

      }
      catch {
         dispatch({ type: ACTIONS.REJECTED, payload: 'Can not delete city with id ' + id })
      }
   }

   return <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      error,
      getCity,
      createCity,
      deleteCity
   }}>
      {children}
   </CitiesContext.Provider>
}

function useCities() {
   const ctx = useContext(CitiesContext)
   return ctx;
}

export { CitiesProvider, useCities }