import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Register
  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
