export default function MovieCard({ movie }) {
    const imageBase = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="w-40 cursor-pointer transform transition duration-300 hover:scale-110">
            <img
                src={movie.poster_path ? imageBase + movie.poster_path : "/no-image.jpg"}
                alt={movie.title}
                className="rounded-lg shadow-md"
            />

            <h3 className="mt-2 text-sm font-semibold text-black">
                {movie.title}
            </h3>

            <p className="text-gray-400 text-xs">
                {movie.release_date?.slice(0, 4)}
            </p>
        </div>
    );
}
