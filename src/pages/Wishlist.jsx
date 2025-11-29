import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, removeFromWishlist } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";


export default function Wishlist() {
  const { user } = useAuth();
  const [ movies, setMovies ] = useState([]);
  const [ page, setPage ] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    if (!user) return;

    // reference to the user's wishlist collection
    const wishlistRef = collection(db, "users", user.uid, "wishlist");

    // real-time listener
    const unsubscribe = onSnapshot(wishlistRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setMovies(items);
      setPage(1);  
    });

    return () => unsubscribe(); // cleanup on unmount
  }, [user]);

  const totalPages = Math.ceil(movies.length / PAGE_SIZE);

  const paginatedMovies = movies.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 pl-2 text-black">My Wishlist</h1>

      {movies.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty</p>
      ) : (
        <MovieGrid
          movies={paginatedMovies}
          isRemovable={true}
          onRemove={(movieId) => removeFromWishlist(movieId, user.uid)}
        />
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </div>
  );
}
