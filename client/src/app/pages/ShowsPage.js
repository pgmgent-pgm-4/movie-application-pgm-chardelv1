import { BaseLayout } from '../layouts';
import FilteredShowList from '../components/tv-shows/FilteredShowList';

const ShowsPage = () => {
  return (
    <BaseLayout>
      <h2>TV Shows</h2>
      <h3>Popular TV Shows</h3>
        <FilteredShowList filter='sort_by=popularity.desc'/>
      <h3>New TV Shows</h3>
        <FilteredShowList filter='sort_by=first_air_date&first_air_date_year=2021&timezone=America%2FNew_York&language=en_US' />
      <h3>Airing Soon</h3>
        <FilteredShowList filter='sort_by=first_air_date.desc&first_air_date.gte=2021&timezone=America%2FNew_York&language=en_US' />
    </BaseLayout>
  );
};

export default ShowsPage;