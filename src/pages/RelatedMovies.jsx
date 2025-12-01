import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSimilarMovies } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";

export default function RelatedMovies() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadSimilar() {
      const response = await getSimilarMovies(id, page);

      // SAFELY normalize data
      const results = Array.isArray(response)
        ? response
        : Array.isArray(response?.results)
        ? response.results
        : [];

      const sliced = results.slice(0, 18);
      const unique = [...new Map(sliced.map(m => [m.id, m])).values()];
      setMovies(unique);
    }
    loadSimilar();
  }, [id, page]);

  
  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold px-2 pl-2 sm:px-6 lg:px-14">Similar Movies</h1>
      <MovieGrid movies={movies} />
    </div>
  );
}
