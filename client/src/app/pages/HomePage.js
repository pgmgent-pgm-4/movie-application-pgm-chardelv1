import { BaseLayout } from '../layouts';
import { MovieList } from '../components/movies'

const HomePage = () => {
  return (
    <BaseLayout>
      <MovieList />
    </BaseLayout>
  );
};

export default HomePage;