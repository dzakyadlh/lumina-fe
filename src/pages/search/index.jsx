import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useParams } from 'react-router';
import { useSearchProvider } from '../../provider/searchProvider';
import { MovieCard } from '../../components/movie_card';
import { CircularProgress } from '@mui/material';

export default function SearchPage() {
  const { title } = useParams();
  const { data, isLoading } = useSearchProvider(title);
  console.log(isLoading);
  console.log(data);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  return (
    <React.Fragment>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col gap-7 pt-28 px-20">
        <header>
          <h1 className="text-3xl font-bold">Search results of "{title}"</h1>
        </header>
        <main>
          <div>
            {data && data.length > 0 ? (
              data.map((item) => <MovieCard key={item.id} movie={item} />)
            ) : (
              <p className="text-xl">No results found for "{title}".</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
}
