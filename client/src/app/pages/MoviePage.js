import { useParams } from 'react-router-dom';

import { MovieDetails } from '../components/movies';
import { BaseLayout } from '../layouts';

const MoviePage = () => {
  const { id } = useParams();
  return (
    <BaseLayout>
      <MovieDetails id={id}/>
    </BaseLayout>
  );
};

export default MoviePage;