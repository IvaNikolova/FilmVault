import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    try {
      await register(email, password, username);
      alert("Registration successful! Please sign in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition text-lg font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
