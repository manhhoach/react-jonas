import { useEffect, useRef, useState } from "react";
import './index.css';
import StarRating from './StarRating'
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const KEY = '1cdd7e2b'
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


function NavBar({ children }) {

  return <nav className="nav-bar">

    {children}
  </nav>
}

function Logo() {
  return <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
}

function NumResults({ movies }) {
  return <p className="num-results">
    Found <strong>{movies.length}</strong> results
  </p>
}

function Search({ query, setQuery }) {

  const ref = useRef(null)
  useKey('keydown','Enter',()=>{
    setQuery('')
    ref.current.focus()
  })
  return <input
    className="search"
    type="text"
    ref={ref}
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
}

function Main({ children }) {

  return <main className="main">
    {children}

  </main>
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen && children}
  </div>
}


function MovieList({ movies, onSelectMovie }) {
  return <ul className="list list-movies">
    {movies?.map((movie) => <Movie key={movie.imdbID} onSelectMovie={onSelectMovie} movie={movie}></Movie>)}
  </ul>
}

function Movie({ movie, onSelectMovie }) {
  return <li onClick={() => onSelectMovie(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
}

function WatchedSummary({ watched }) {

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>
}

function WatchedList({ watched, onDeleteWatched }) {
  return <ul className="list">
    {watched.map((movie) => <WatchedMovie onDeleteWatched={onDeleteWatched} movie={movie} key={movie.imdbID}></WatchedMovie>)}
  </ul>
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return <li >
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>
        x
      </button>
    </div>
  </li>
}

function Loader() {
  return <p className="loader">Loading...</p>
}

function ErrorMessage({ message }) {
  return <p className="error">
    <span>{message}</span>
  </p>
}

function MovieDetail({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(null)
  const yourRating = watched.filter(m => m.imdbID === selectedId)[0]
  const countRef = useRef(0)

  useEffect(function () {
    if (rating) {
      countRef.current++
    }
  }, [rating])

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: movie.Title,
      poster: movie.Poster,
      runtime: movie.Runtime.split(' ').at(0),
      year: movie.Year,
      imdbRating: movie.imdbRating,
      userRating: rating,
      countRef: countRef.current
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }



  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true)
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      if (!res.ok) {
        throw new Error('Something went wrong')
      }
      const data = await res.json();
      setMovie(data)
      setIsLoading(false)
    }

    getMovieDetails()

  }, [selectedId])

  useKey('keydown', 'Escape', onCloseMovie)




  useEffect(() => {
    if (movie.Title) {
      document.title = movie.Title
    }

    return () => {
      document.title = 'Use popcorn'
    }
  }, [movie.Title])

  return <div className="details">
    {
      isLoading ? <Loader /> :
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
            <img src={movie.Poster} alt="" />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>{movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!yourRating ?
                <>
                  <StarRating maxRating={10} size={24} onSetRating={setRating}></StarRating>
                  {
                    rating > 0 &&
                    <button className="btn-add" onClick={handleAdd}>Add to list</button>

                  }
                </>
                : <>
                  <p>You rated this movie {yourRating.userRating}<span>⭐️</span></p>
                </>
              }
            </div>
            <p><em>{movie.Plot}</em></p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
    }


  </div>
}


export default function App() {

  const [query, setQuery] = useState("spider");
  const [selectedId, setSelectedId] = useState(null)
  // const [watched, setWatched] = useState(() => {
  //   return JSON.parse(localStorage.getItem('watched')) || []
  // });
  const [watched, setWatched] = useLocalStorageState([], 'watched');


  const { movies, isLoading, error } = useMovies(query)


  function handleSelectMovie(id) {
    setSelectedId(current => current === id ? null : id)
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }
  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }
  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(m => m.imdbID !== id))
  }




  return (
    <>
      <NavBar>
        <Logo></Logo>
        <Search query={query} setQuery={setQuery}></Search>
        <NumResults movies={movies}></NumResults>
      </NavBar>
      <Main >
        <Box>
          {isLoading ? <Loader /> : (error ? <ErrorMessage message={error} /> : <MovieList onSelectMovie={handleSelectMovie} movies={movies} />)}
        </Box>
        <Box>
          {
            selectedId ? <MovieDetail watched={watched} onCloseMovie={handleCloseMovie}
              selectedId={selectedId} onAddWatched={handleAddWatched}

            /> :
              <>
                <WatchedSummary watched={watched}></WatchedSummary>
                <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched}></WatchedList>
              </>
          }

        </Box>
      </Main>
    </>
  );
}
