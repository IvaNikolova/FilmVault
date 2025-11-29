import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import bgImage from "../assets/poster1.jpg"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      await register(email, password, username);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

        {/* FORM CARD */}
        <div className="relative min-h-screen flex items-center justify-center px-6">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-10 w-full max-w-md text-white">

            {/* LOGO */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Clapperboard size={36} className="text-red-500" />
              <h1 className="text-3xl font-bold tracking-wide">FilmVault</h1>
            </div>

            <p className="text-gray-400 text-center mb-6">
              Create your vault and start collecting films.
            </p>

            {/* ERROR */}
            {error && (
              <div className="bg-red-500/20 text-red-300 text-sm text-center py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded bg-gray-900 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded bg-gray-900 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded bg-gray-900 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg text-lg font-semibold"
              >
                Create Account
              </button>

            </form>

            <p className="text-gray-400 text-center mt-6 text-sm">
              Already registered?{" "}
              <Link to="/login" className="text-red-400 hover:underline font-medium">
                Sign in
              </Link>
            </p>

        </div>
      </div>
    </div>
  );
}
