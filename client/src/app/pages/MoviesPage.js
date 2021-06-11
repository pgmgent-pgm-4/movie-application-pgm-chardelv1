import { FilteredMovieList } from '../components/movies';
import { BaseLayout } from '../layouts';

const MoviesPage = () => {
  return (
    <BaseLayout>
      <h2>Movies</h2>
      <h3>Popular Movies</h3>
        <FilteredMovieList filter={'sort_by=popularity.desc'}/>
      <h3>New Releases</h3>
        <FilteredMovieList filter={'primary_release_year=2021'} />
      <h3>Coming Soon</h3>
        <FilteredMovieList filter={'sort_by=release_date.desc'} />
    </BaseLayout>
  );
};

export default MoviesPage;