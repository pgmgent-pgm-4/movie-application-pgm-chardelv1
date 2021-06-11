import { BaseLayout } from '../layouts';
import { MovieTrailers, FilteredMovieList } from '../components/movies';
import { FilteredShowList } from '../components/tv-shows';

const HomePage = () => {
  return (
    <BaseLayout>
    <section className="movies">
      <h2>Movies</h2>
      <h3>Popular Movies</h3>
      <FilteredMovieList filter={'sort_by=popularity.desc'}/>

      <h3>New Releases</h3>
      <FilteredMovieList filter={'primary_release_year=2021'} />

      <h3>Coming Soon</h3>
      <FilteredMovieList filter={'sort_by=release_date.desc'} />

      <h3>Popular Trailers</h3>
      <MovieTrailers />
    </section>
    <section className="tv-shows">
      <h2>TV Shows</h2>
      <h3>Popular TV Shows</h3>
      <FilteredShowList filter='sort_by=popularity.desc'/>
      
      <h3>New TV Shows</h3>
      <FilteredShowList filter='sort_by=first_air_date&first_air_date_year=2021&timezone=America%2FNew_York&language=en_US' />
      
      <h3>Airing Soon</h3>
      <FilteredShowList filter='sort_by=first_air_date.desc&first_air_date.gte=2021&timezone=America%2FNew_York&language=en_US' />
    </section>
    </BaseLayout>
  );
};

export default HomePage;