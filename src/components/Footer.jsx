import { Globe, CircleSmall } from "lucide-react";
import { SiGithub, SiReact, SiFirebase, SiTailwindcss, SiThemoviedatabase } from "@icons-pack/react-simple-icons";
import { SiLinkedin } from "react-icons/si";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center md:place-items-center">

            {/* LEFT SECTION */}
            <div className="text-left">
                <h2 className="text-white text-xl font-bold mb-2">🎬 Movie Wishlist</h2>
                <p className="text-gray-400 mb-3">Your personal movie universe.</p>
                <p className="text-sm text-gray-500">Built by Iva Nikolova</p>

                <div className="flex gap-4 mt-4">
                    <a
                    href="https://github.com/IvaNikolova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                    title="GitHub"
                    >
                        <SiGithub size={20} />
                    </a>

                    <a
                    href="https://www.linkedin.com/in/iva-nikolova-ba5626127/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                    title="LinkedIn"
                    >
                        <SiLinkedin size={20} />
                    </a>

                    <a
                    href="https://bit.ly/iva-nikolova-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                    title="Portfolio"
                    >
                        <Globe size={20} />
                    </a>
                </div>
            </div>

            {/* MIDDLE SECTION */}
            <div className="text-left">
                <h3 className="text-white font-semibold mb-2">Features</h3>
                <ul className="space-y-1 text-gray-400 text-sm">
                    <li className="flex items-center gap-2">                        
                        <CircleSmall size={8}/> Add to Wishlist
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleSmall size={8}/> Personalized Recommendations
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleSmall size={8}/> Browse by Genre
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleSmall size={8}/> Search Movies
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleSmall size={8}/> Real-time Sync
                    </li>
                </ul>
            </div>

            {/* RIGHT SECTION */}
            <div className="text-left">
                <h3 className="text-white font-semibold mb-2">Built With</h3>
                
                <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-center gap-2">
                        <SiReact size={18} /> React
                    </li>

                    <li className="flex items-center gap-2">
                        <SiTailwindcss size={18} /> Tailwind CSS
                    </li>

                    <li className="flex items-center gap-2">
                        <SiFirebase size={18} /> Firebase
                    </li>

                    <li className="flex items-center gap-2">
                        <SiThemoviedatabase size={18} /> TMDB API
                    </li>
                </ul>
            </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="bg-black text-gray-500 text-center text-xs py-3">
            © {new Date().getFullYear()} Movie Wishlist · All rights reserved
        </div>
    </footer>
  );
}
