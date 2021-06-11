import { BaseLayout } from '../layouts';
import { ShowList } from '../components/tv-shows';

const ShowsPage = () => {
  return (
    <BaseLayout>
      <h1>TV Shows</h1>
        <ShowList />
    </BaseLayout>
  );
};

export default ShowsPage;