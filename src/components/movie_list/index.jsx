import { MovieCard } from '../movie_card';

export function MovieList({ title, movies, error }) {
  if (error)
    return (
      <div className="w-full flex flex-col px-5 md:px-20 mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <section
      className="w-full flex flex-col px-5 md:px-20 gap-7 mb-10"
      data-aos="fade-up"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h2>
      <ul className="w-full flex gap-2 sm:gap-5">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </ul>
    </section>
  );
}
