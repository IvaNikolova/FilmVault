import { Link } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import bgImage from "./assets/poster1.jpg"; // your background image

export default function App() {
  return (
    <div className="min-h-screen w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImage})` }}>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />

      {/* CONTENT */}
      <div className="relative min-h-screen flex items-center justify-center px-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">

          {/* LOGO */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Clapperboard size={36} className="text-red-500" />
            <h1 className="text-4xl font-bold tracking-wide text-white">
              FilmVault
            </h1>
          </div>

          {/* TAGLINE */}
          <p className="text-gray-400 mb-8">
            Save movies you love. Discover your next favorite.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-4">
            <Link
              to="/login"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition text-lg font-medium"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition text-lg font-medium"
            >
              Create account
            </Link>
          </div>

          {/* FOOTNOTE */}
          <p className="mt-6 text-sm text-gray-500">
            Your personal movie vault
          </p>

        </div>
      </div>
    </div>
  );
}
