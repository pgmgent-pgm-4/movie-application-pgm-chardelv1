import { BaseLayout } from '../layouts';
import { ShowList } from '../components/tv-shows';

const ShowsPage = () => {
  return (
    <BaseLayout>
        <ShowList />
    </BaseLayout>
  );
};

export default ShowsPage;