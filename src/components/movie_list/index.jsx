import { MovieCard } from '../movie_card';
import { useSwipeable } from 'react-swipeable';
import { useRef } from 'react';

export function MovieList({ title, movies, error }) {
  const listRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Scroll to the right
      if (listRef.current) {
        listRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    },
    onSwipedRight: () => {
      // Scroll to the left
      if (listRef.current) {
        listRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (error)
    return (
      <div className="w-full flex flex-col px-5 md:px-20 mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h2>
        <p className="text-red-500">{error}</p>
        <p className="text-red-500 text-sm">Try to refresh the page</p>
      </div>
    );

  return (
    <section
      className="min-w-full flex flex-col py-2 px-5 md:px-10 xl:px-20 gap-4 sm:gap-7 mb-10"
      data-aos="fade-up"
    >
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <ul
        ref={listRef}
        className="w-full flex gap-5 max-md:overflow-x-auto no-scrollbar scroll whitespace-nowrap"
        {...handlers}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.movie_id} movie={movie} />
        ))}
      </ul>
    </section>
  );
}
