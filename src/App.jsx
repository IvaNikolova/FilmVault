import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Movie Wishlist
        </h1>

        <p className="text-gray-600 mb-8">
          Save movies you love and get personalized recommendations.
        </p>

        <div className="flex flex-col gap-4">
          <Link to="/login" className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-lg font-medium">
            Login
          </Link>

          <Link to="/register" className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition text-lg font-medium">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
