import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, isRemovable, onRemove }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isRemovable={isRemovable}
              onRemove={() => onRemove && onRemove(movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
