import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CircularProgress } from '@mui/material';
import { getDetailsById, getTvShowsByGenre } from '../../api/movies';
import { faAdd, faPlay } from '@fortawesome/free-solid-svg-icons';
import { addWatchlist } from '../../api/users';
import { secondsToRuntime } from '../../utils/runtimeConverter';
import { MovieList } from '../../components/movie_list';
import {
  CustomFilledButton,
  CustomSecondaryButton,
} from '../../components/custom_buttons';

export default function TVShowDetailPage() {
  const { tvShow_id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchTvShowData = async () => {
      try {
        const data = await getDetailsById(tvShow_id);
        console.log(data);
        setTvShow(data);
        const reData = await getTvShowsByGenre(data.genres[0].text);
        setRecommendations(reData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTvShowData();

    AOS.init({
      duration: 1000,
      offset: 100,
    });
  }, [tvShow_id]);

  const handleAddWatchlist = async () => {
    try {
      const data = await addWatchlist(tvShow_id);
      if (data) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  return (
    <React.Fragment key={tvShow_id}>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col gap-10">
        <img
          src={tvShow.imageUrl}
          alt="banner poster"
          className="absolute h-screen w-full object-cover object-top top-0 right-0 z-[-10] filter brightness-50"
        />
        <div className="absolute h-full w-full bg-gradient-to-r from-black via-transparent to-transparent top-0 left-0 z-[-5]"></div>
        {showToast && (
          <div
            id="toast"
            className="fixed bottom-5 right-5 border-yellow-400 border rounded-lg p-4 bg-black"
          >
            {tvShow.title} added to your watchlist!
          </div>
        )}
        <header
          data-aos="fade-right"
          className="h-screen w-full md:w-3/5 2xl:w-2/5 flex flex-col justify-center px-5 md:px-10 xl:px-40 gap-5"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">{tvShow.title}</h1>
          <p className="line-clamp-6">{tvShow.plot}</p>
          <p className="text-subtitle">
            {tvShow.releaseYear} | {secondsToRuntime(tvShow.runtime)} |{' '}
            {tvShow.genres.map((genre) => genre.text).join(', ')}
          </p>
          <p className="">
            <span className="text-subtitle">Starring: </span>
            {tvShow.stars.split(' in')[0]}
          </p>
          <div className="flex items-center gap-5">
            <CustomFilledButton
              btnText="Play"
              onClick={() => {}}
              icon={faPlay}
            />
            <CustomSecondaryButton
              btnText="Watch Later"
              onClick={() => {
                handleAddWatchlist();
              }}
              icon={faAdd}
            />
          </div>
        </header>
        <main className="flex flex-col gap-5 md:gap-10">
          {tvShow.episodes.seasons.map((season, index) => (
            <section
              data-aos="fade-up"
              key={index + 1}
              className="flex flex-col gap-5 px-5 lg:px-40"
            >
              <h2 className="text-2xl md:text-3xl font-semibold">
                Season {index + 1}
              </h2>
              <ul className="flex flex-col">
                {Array.from(
                  {
                    length:
                      tvShow.episodes.episodes.total /
                      tvShow.episodes.seasons.length,
                  },
                  (_, subindex) => (
                    <li
                      key={subindex + 1}
                      className="flex items-center max-sm:flex-col max-sm:items-start gap-4 p-5 border-b border-default-border"
                    >
                      <div className="w-32 h-20 rounded-lg bg-subtitle"></div>
                      <div className="flex flex-col">
                        <p className="font-medium text-lg">
                          Episode {subindex + 1}
                        </p>
                        <p className="text-subtitle overflow-ellipsis max-sm:text-sm line-clamp-3">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Maiores exercitationem harum ut veritatis quae
                          debitis excepturi possimus praesentium quod ipsa.
                        </p>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </section>
          ))}
          <main
            data-aos="fade-up"
            className="w-full flex flex-col gap-7 sm:px-5 2xl:px-40"
          >
            <MovieList
              title="More like this"
              movies={recommendations}
              error={error}
            />
          </main>
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
}
