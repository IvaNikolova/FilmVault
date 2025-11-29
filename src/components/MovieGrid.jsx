import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, isRemovable, onRemove }) {
    return (
        <div className="grid pl-2 mt-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    isRemovable={isRemovable}
                    onRemove={() => onRemove && onRemove(movie.id)}
                />
            ))}
        </div>
    );
}
