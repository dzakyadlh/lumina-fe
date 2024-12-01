import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import {
  MovieCard,
  FeatureCard,
  ReviewCard,
} from '../../components/movie_card';
import { motion } from 'motion/react';
import Footer from '../../components/footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CircularProgress } from '@mui/material';
import {
  getPopularMovies,
  getPopularSeries,
  getRandomTvShows,
} from '../../api/movies';
import { CustomFilledButton } from '../../components/custom_buttons';
import { MovieList } from '../../components/movie_list';

export default function LandingPage() {
  const [data, setData] = useState({
    popular: [],
    freeToWatch: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    popular: null,
    freeToWatch: null,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [popular, freeToWatch] = await Promise.all([
          getPopularMovies(),
          getRandomTvShows(1),
        ]);

        setData({
          popular,
          freeToWatch,
        });
      } catch (error) {
        // Handle errors for specific datasets
        setErrors((prev) => ({
          ...prev,
          popular: error.response?.status === 404 ? 'Popular not found' : null,
          freeToWatch:
            error.response?.status === 404 ? 'Free to watch not found' : null,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    AOS.init({
      duration: 1000, // animation duration in ms
      offset: 100, // offset from the viewport
    });
    AOS.refresh();

    fetchAllData();
  }, []);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  const items = [
    '/images/poster1.jpg',
    '/images/poster2.jpg',
    '/images/poster3.jpg',
    '/images/poster4.jpg',
    '/images/poster5.jpg',
  ];
  const repeatedItems = [...items, ...items];

  return (
    <React.Fragment>
      <Navbar page="landing" />
      <header
        data-aos="fade-up"
        className="relative min-h-screen w-full flex flex-col items-center justify-center mb-10"
      >
        <div className="absolute top-0 left-0 flex h-screen w-full overflow-x-hidden z-[-10] overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {repeatedItems.map((item, index) => {
              return (
                <img
                  key={`poster-${index}`}
                  className="h-full w-auto inline-block filter brightness-50"
                  src={item}
                  alt="poster"
                />
              );
            })}
          </div>

          <div className="flex absolute top-0 animate-marquee2 whitespace-nowrap">
            {repeatedItems.map((item, index) => {
              return (
                <img
                  key={`poster-${index}`}
                  className="h-full w-auto inline-block filter brightness-50"
                  src={item}
                  alt="poster"
                />
              );
            })}
          </div>
        </div>
        <h1 className="font-bold text-4xl sm:text-5xl text-center px-5 lg:w-1/2 leading-snug sm:leading-relaxed mb-5 text-yellow-200">
          Lighten up your world with unlimited movies, TV shows, and more
        </h1>
        <p className="sm:text-xl text-center sm:w-1/2">
          Starts free with our weekly free to watch rotations!
        </p>
      </header>
      <section
        data-aos="fade-up"
        className="w-full flex flex-col items-center justify-center box-border p-5 md:p-10 gap-5"
      >
        <p>
          Feeling the light already? Enter your email to create an account and
          start watching.
        </p>
        <form className="flex max-sm:flex-col max-sm:items-end justify-center w-full lg:w-2/3 gap-5">
          <input
            type="email"
            class="w-full md:w-2/3 bg-white border border-gray-300 text-gray-900 rounded-full block p-4 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark"
            placeholder="Email Address"
            required
          />
          <CustomFilledButton btnText="Watch Now!" onClick={() => {}} />
        </form>
      </section>
      <MovieList
        data-aos="fade-up"
        title="Popular Now"
        movies={data.popular}
        error={errors.popular}
      />
      <MovieList
        data-aos="fade-up"
        title="This Week's Free to Watch"
        movies={data.freeToWatch}
        error={errors.freeToWatch}
      />
      <section
        data-aos="fade-up"
        className="w-full flex flex-col px-5 md:px-20 py-10 gap-7"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          More Reasons to Join Lumina
        </h2>
        <ul className="w-full flex justify-center gap-5 max-md:flex-wrap">
          <FeatureCard titleText="Movies tailored to your taste" bodyText="" />
          <FeatureCard titleText="Cancel or switch plan anytime" />
          <FeatureCard titleText="Watch in any devices, anywhere, anytime" />
          <FeatureCard titleText="Always updated movie list" />
        </ul>
      </section>
      <section
        data-aos="fade-up"
        className="w-full flex flex-col px-5 md:px-20 py-10 gap-7"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          What they say about Lumina
        </h2>
        <ul className="w-full flex max-lg:flex-col gap-10">
          <ReviewCard
            profilePicture="/images/review1.jpg"
            name="Mizuki Rei"
            reviewText="Lumina is a game-changer for movie lovers! The user interface is sleek and intuitive, making it easy to find and watch your favorite movies. The personalized recommendations are spot on, and the ability to create watchlists is a fantastic feature. Highly recommend!"
          />
          <ReviewCard
            profilePicture="/images/review2.jpg"
            name="Akame Mina"
            reviewText="As a frequent movie watcher, I've tried many different apps, but Lumina is by far the best. The high-quality streaming, extensive library, and seamless user experience make it a must-have for anyone who loves movies. Plus, the offline viewing feature is a lifesaver for long flights or commutes."
          />
          <ReviewCard
            profilePicture="/images/review3.jpg"
            name="Jean Chatto"
            reviewText="I'm so impressed with Lumina! The vast collection of movies, combined with the ability to rent or buy new releases, makes it a complete entertainment solution. The app's performance is excellent, and the customer support is top-notch. I'm a satisfied user!"
          />
        </ul>
      </section>
      <section
        data-aos="fade-up"
        className="w-full flex flex-col px-5 md:px-20 py-10 gap-7"
      >
        <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">10M+</dt>
            <dd className="text-gray-500 dark:text-subtitle text-center">
              Monthly Active Users
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">100K+</dt>
            <dd className="text-gray-500 dark:text-subtitle text-center">
              Movies and TV Shows
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">50+</dt>
            <dd className="text-gray-500 dark:text-subtitle text-center">
              Countries Supported
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">10+</dt>
            <dd className="text-gray-500 dark:text-subtitle text-center">
              Subtitles Supported
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">4.8+</dt>
            <dd className="text-gray-500 dark:text-subtitle text-center">
              Average Rating
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">24/7</dt>
            <dd className="text-gray-500 dark:text-subtitle text-center">
              Customer Support
            </dd>
          </div>
        </dl>
      </section>
      <section
        data-aos="fade-up"
        className="w-full flex flex-col items-center px-5 md:px-20 py-10 gap-7"
      >
        <p className="text-center">
          So, what are you waiting for? Go on and try it yourself!
        </p>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#fde047' }}
          className="px-10 py-3 bg-yellow-200 rounded-full text-black font-semibold"
          onClick={() => {}}
        >
          Join Now!
        </motion.button>
      </section>
      <Footer />
    </React.Fragment>
  );
}
