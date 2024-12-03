import React, { useEffect, useRef, useState } from 'react';

export default function TestPage() {
  return (
    <div className="w-full h-screen">
      <MoviePosterList />
    </div>
  );
}

const postersToShow = {
  default: 8,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 8,
};

// Adjust the number of posters based on screen size
const getPostersToShow = () => {
  if (window.innerWidth < 640) return postersToShow.sm;
  if (window.innerWidth < 768) return postersToShow.md;
  if (window.innerWidth < 1024) return postersToShow.lg;
  return postersToShow.default;
};

const MoviePosterList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postersToShow, setPostersToShow] = useState(8);
  const posters = [
    { image: 'images/poster1.jpg', title: 'test' },
    { image: 'images/poster2.jpg', title: 'test' },
    { image: 'images/poster3.jpg', title: 'test' },
    { image: 'images/poster4.jpg', title: 'test' },
    { image: 'images/poster5.jpg', title: 'test' },
    { image: 'images/poster1.jpg', title: 'test' },
    { image: 'images/poster2.jpg', title: 'test' },
    { image: 'images/poster3.jpg', title: 'test' },
  ];

  useEffect(() => {
    const updatePostersToShow = () => {
      setPostersToShow(getPostersToShow());
    };

    window.addEventListener('resize', updatePostersToShow);
    updatePostersToShow(); // Initial call

    return () => window.removeEventListener('resize', updatePostersToShow);
  }, []);

  const handleNext = () => {
    if (currentIndex < posters.length - postersToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative">
      <button onClick={handlePrev} className="absolute left-0 z-10">
        Left
      </button>
      <div className="flex overflow-x-auto">
        {posters
          .slice(currentIndex, currentIndex + postersToShow)
          .map((poster, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 md:w-48 lg:w-56 mx-2"
            >
              <img
                src={poster.image}
                alt={poster.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
      </div>
      <button onClick={handleNext} className="absolute right-0 z-10">
        Right
      </button>
    </div>
  );
};
