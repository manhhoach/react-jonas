import { useState, useEffect } from "react";

const KEY = '1cdd7e2b'
export function useMovies(query) {
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState(null)

   useEffect(() => {
     // callback?.()
      const controller = new AbortController()
      async function fetchMovie() {
         try {
            setIsLoading(true)
            setError('')
            const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
            if (!res.ok) {
               throw new Error('Something went wrong')
            }
            const data = await res.json();

            if (data.Response === 'False') {
               throw new Error('Movie not found')
            }
            setMovies(data.Search)
            setError('')
         }
         catch (e) {
            if (e.name !== 'AbortError') {
               setError(e.message)
            }
         } finally {
            setIsLoading(false)
         }
      }

      if (query.length < 3) {
         fetchMovie([])
         setError('')
         return
      }
      fetchMovie()

      return () => {
         controller.abort()
      }
   }, [query])

   return {movies, isLoading, error}
}