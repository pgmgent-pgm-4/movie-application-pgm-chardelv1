import { BaseLayout } from '../layouts';
import { FilteredMovieList } from '../components/movies'

const HomePage = () => {
  return (
    <BaseLayout>
    <h2>Movies</h2>
    <h3>Popular Movies</h3>
      <FilteredMovieList filter={'sort_by=popularity.desc'}/>
    <h3>New Releases</h3>
      <FilteredMovieList filter={'release_year.lte=\'2022\''} />
    <h3>Coming Soon</h3>
      <FilteredMovieList filter={'sort_by=release_date.desc'} />
    </BaseLayout>
  );
};

export default HomePage;