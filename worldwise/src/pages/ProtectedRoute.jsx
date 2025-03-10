import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/FakeAuthContext"
import { useEffect } from "react"


export default function ProtectedRoute({ children }) {
   const { isAuthenticated } = useAuth()
   const navi = useNavigate()

   useEffect(function () {
      if (!isAuthenticated) {
         navi('/')
      }
   }, [isAuthenticated, navi])

   return isAuthenticated ? children : null;


}