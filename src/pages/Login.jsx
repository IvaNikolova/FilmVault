import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/movies");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {error && (
          <div className="text-red-500 text-center mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-lg font-medium"
          >
            Login
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 font-medium hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
