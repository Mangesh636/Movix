import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import HeroBannerImage from "./assets/hero.png";
import { API_BASE_URL, API_OPTIONS } from "./constant";

import { Search } from "./components/Search";
import { Loader } from "./components/Loader";
import { MovieCard } from "./components/MovieCard";
import { getTrendingMovies, updateSearchTerm } from "./config/appwrite";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debouncing Searchterm from making too much requests
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  // Fetching movies
  const fetchMovies = async (query = "") => {
    setIsLoading(true), setErrorMessage("");
    try {
      const apiURL = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(apiURL, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMoviesList([]);
        return;
      }

      setMoviesList(data.results || []);
      if (query && data.results.length > 0) {
        await updateSearchTerm(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load trending movies
  const fetchTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src={HeroBannerImage} alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy
            without the Hassel
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          <ul>
            {moviesList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
