// src/pages/Recommendations.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { getMoviesByGenre, getSimilarMovies, getGenres } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";

export default function Recommendations() {
  const { user } = useAuth();
  const [ wishlist, setWishlist ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ topGenres, setTopGenres ] = useState([]);
  const [ lastTwo, setLastTwo ] = useState([]);
  const [ genreMovies, setGenreMovies ] = useState([]);
  const [ similarMovies, setSimilarMovies ] = useState([]);
  const [ finalRecommendations, setFinalRecommendations ] = useState([]);
  const [ genreMap, setGenreMap ] = useState({});

  // Load wishlist in real-time from Firestore
  useEffect(() => {
    if (!user) return;
    const ref = collection(db, "users", user.uid, "wishlist");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          timestamp: data.timestamp?.toMillis ? data.timestamp.toMillis() : null,
        };
      });
      setWishlist(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Analyze wishlist → top 2 genres + last 2 movies
  useEffect(() => {
    if (wishlist.length === 0) {
      setTopGenres([]);
      setLastTwo([]);
      return;
    }
    
    // Find top 2 genres
    const genreCount = {};
    wishlist.forEach((movie) => {
      if (!movie.genre_ids) return; 
      movie.genre_ids.forEach((gid) => {
        genreCount[gid] = (genreCount[gid] || 0) + 1;
      });
    });

    const sortedGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1]) 
      .map(([gid]) => Number(gid));

    setTopGenres(sortedGenres.slice(0, 2)); 

    // Find last 2 movies by timestamp 
    const sortedByTime = [...wishlist]
      .filter((m) => m.timestamp)
      .sort((a, b) => b.timestamp - a.timestamp);

    setLastTwo(sortedByTime.slice(0, 2));
  }, [wishlist]);

  // Fetch movies for top genres
  useEffect(() => {
    async function fetchGenreMovies() {
      if (topGenres.length === 0) {
        setGenreMovies([]);
        return;
      }

      const [g1, g2] = topGenres;
      let all = [];

      // Always fetch the first top genre
      const res1 = await getMoviesByGenre(g1, 1);
      all = [...all, ...(res1?.results || [])];

      // If a second genre exists, fetch that too
      if (g2) {
        const res2 = await getMoviesByGenre(g2, 1);
        all = [...all, ...(res2?.results || [])];
      }

      // Remove duplicates by id
      const unique = [...new Map(all.map((m) => [m.id, m])).values()];

      // Remove movies already in wishlist
      const filtered = unique.filter(
        (m) => !wishlist.some((w) => w.id === m.id)
      );
      setGenreMovies(filtered);
    }
    fetchGenreMovies();
  }, [topGenres, wishlist]);

  // Fetch similar movies for the last two wishlist movies
  useEffect(() => {
    async function fetchSimilar() {
      if (lastTwo.length === 0) {
        setSimilarMovies([]);
        return;
      }

      let all = [];
      for (const movie of lastTwo) {
        const res = await getSimilarMovies(movie.id);
        all = [...all, ...res];
      }

      // Remove duplicates
      const unique = [...new Map(all.map((m) => [m.id, m])).values()];

      // Remove movies already in wishlist
      const filtered = unique.filter(
        (m) => !wishlist.some((w) => w.id === m.id)
      );
      setSimilarMovies(filtered);
    }
    fetchSimilar();
  }, [lastTwo, wishlist]);

  // Combine genreMovies + similarMovies
  useEffect(() => {
    if (genreMovies.length === 0 && similarMovies.length === 0) {
      setFinalRecommendations([]);
      return;
    }

    const map = new Map();

    // Genre-based → weight 0.4
    for (const movie of genreMovies) {
      const prev = map.get(movie.id);
      const prevScore = prev?.score ?? 0;
      map.set(movie.id, { movie, score: prevScore + 0.4 });
    }

    // Similar-based → weight 0.6
    for (const movie of similarMovies) {
      const prev = map.get(movie.id);
      const prevScore = prev?.score ?? 0;
      map.set(movie.id, { movie, score: prevScore + 0.6 });
    }

    const combined = [...map.values()]
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.movie)
      .slice(0, 42);
      
    setFinalRecommendations(combined);
  }, [genreMovies, similarMovies]);

  useEffect(() => {
    async function loadGenres() {
      const genres = await getGenres();

      // Convert list into object: { id: name }
      const map = {};
      genres.forEach(g => {
        map[g.id] = g.name;
      });

      setGenreMap(map);
    }
    loadGenres();
  }, []);


  if (loading) {
    return <p className="p-6 text-black">Loading recommendations...</p>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="p-6 text-black">
        <h1 className="text-3xl font-bold mb-4">Recommendations</h1>
        <p>Add movies to your wishlist to receive personalized recommendations.</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold px-2 pl-2 sm:px-6 lg:px-14">Recommendations</h1>

      {/* <div className="mb-6 p-4 bg-gray-100 rounded-lg text-gray-700 text-sm">
        <p>
          <strong>Top genres:</strong>{" "}
          {topGenres.length
            ? topGenres.map(id => genreMap[id] || id).join(", ")
            : "No genre data yet"}
        </p>
        <p>
          <strong>Last two movies added to wishlist:</strong>{" "}
          {lastTwo.length ? lastTwo.map((m) => m.title).join(", ") : "Not enough data"}
        </p>
      </div> */}

      {finalRecommendations.length === 0 ? (
        <p className="text-gray-600">
          Not enough data yet. Try adding a few more movies to your wishlist.
        </p>
      ) : (
        <MovieGrid movies={finalRecommendations} />
      )}
    </div>
  );
}
