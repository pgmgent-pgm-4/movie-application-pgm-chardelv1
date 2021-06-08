import { BaseLayout } from '../layouts';
import FilteredShowList from '../components/tv-shows/ShowList';

const ShowsPage = () => {
  return (
    <BaseLayout>
      <h2>TV Shows</h2>
      <h3>Popular TV Shows</h3>
        <FilteredShowList filter={'sort_by=popularity.desc'}/>
      <h3>New Releases</h3>
        <FilteredShowList filter={'release_year.lte=\'2022\''} />
      <h3>Coming Soon</h3>
        <FilteredShowList filter={'sort_by=release_date.desc'} />
    </BaseLayout>
  );
};

export default ShowsPage;