// Importing required hooks from React
import { useEffect, useState } from "react";
import Loadder from "./Loader";
import ErrorMessage from "./ErrorMessage";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WathcedList";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import Box from "./Box";
import Main from "./Main";
import Search from "./Search";
import NumResults from "./NumResults";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { useMovies } from "../useMovies";
// OMDb API key

export default function App() {
  // State management for search query, movies, watched movies, etc.
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  // Effect hook to fetch movies from OMDb API when query changes

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/* {isLoading ? <Loadder /> : <MovieList movies={movies} />} */}
          {isLoading && <Loadder />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
