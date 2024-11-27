export default function CarouselBanner({ movies }) {
  return (
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
      {movies.map((movie, index) => (
        <div
          key={index}
          className={`hidden duration-700 ease-in-out`}
          data-carousel-item
        >
          <img
            src={movie.imageUrl}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt={movie.title || 'Movie Banner'}
          />
        </div>
      ))}
    </div>
  );
}
