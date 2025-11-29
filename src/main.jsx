import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

// Pages
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/Wishlist";
import Recommendations from "./pages/Recommendations";
import GenrePage from "./pages/GenrePage";
import RelatedMovies from "./pages/RelatedMovies";
import Search from "./pages/Search";
import CategoryPage from "./pages/CategoryPage";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected pages */}
          <Route path="/movies"
            element={
              <ProtectedRoute>
                <Layout>
                  <Movies />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/wishlist"
            element={
              <ProtectedRoute>
                <Layout>
                  <Wishlist />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/recommendations"
            element={
              <ProtectedRoute>
                <Layout>
                  <Recommendations />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/movie/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <MovieDetails />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/genre/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <GenrePage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/movie/:id/related"
            element={
              <ProtectedRoute>
                <Layout>
                  <RelatedMovies />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Layout>
                  <Search />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/category/:type"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryPage />
                </Layout>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
