import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc, getDoc, collection } from "firebase/firestore";

// Firebase config from environment variables (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);

// Add movie to wishlist
export async function addToWishlist(movie, userId) {
  const movieRef = doc(db, "users", userId, "wishlist", movie.id.toString());

  // Save only the important fields
  const movieData = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    timestamp: new Date()
  };

  await setDoc(movieRef, movieData);
}

// Remove movie from wishlist
export async function removeFromWishlist(movieId, userId) {
  const movieRef = doc(db, "users", userId, "wishlist", movieId.toString());
  await deleteDoc(movieRef);
}

//  Check if movie is already in wishlist
export async function checkIfInWishlist(movieId, userId) {
  const movieRef = doc(db, "users", userId, "wishlist", movieId.toString());
  const snapshot = await getDoc(movieRef);

  return snapshot.exists(); // true if saved, false otherwise
}

// Get all wishlist movies for a user
export async function getWishlist(userId) {
  const wishlistRef = collection(db, "users", userId, "wishlist");
  const snapshot = await getDocs(wishlistRef);

  return snapshot.docs.map(doc => doc.data());
}