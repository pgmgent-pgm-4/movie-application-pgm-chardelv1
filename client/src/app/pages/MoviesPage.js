import { MovieList } from '../components/movies';
import { BaseLayout } from '../layouts';

const MoviesPage = () => {
  return (
    <BaseLayout>
      <MovieList />
    </BaseLayout>
  );
};

export default MoviesPage;