import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import MovieGrid from "../components/MovieGrid";

export default function Wishlist() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user) return;

    // reference to the user's wishlist collection
    const wishlistRef = collection(db, "users", user.uid, "wishlist");

    // real-time listener
    const unsubscribe = onSnapshot(wishlistRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setMovies(items);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">My Wishlist</h1>

      {movies.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty 😊</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
}
