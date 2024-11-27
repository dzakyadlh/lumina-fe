import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import HomePage from './pages/home';
import TVShowsPage from './pages/tvShows';
import MoviesPage from './pages/movies';
import MovieDetailPage from './pages/movies/detail';
import TVShowDetailPage from './pages/tvShows/detail';
import WatchlistPage from './pages/watchlist';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="landing" element={<Landing />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="" element={<HomePage />} />
        <Route path="tvShows" element={<TVShowsPage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:movie_id" element={<MovieDetailPage />} />
        <Route path="tvShows/:tvShow_id" element={<TVShowDetailPage />} />
        <Route path="watchList" element={<WatchlistPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
