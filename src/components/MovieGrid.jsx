import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 p-4">
            {movies.map((movie, index) => (
                <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
        </div>
    );
}
