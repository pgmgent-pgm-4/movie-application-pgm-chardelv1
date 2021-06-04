import { useParams } from 'react-router-dom';

import { BaseLayout } from '../layouts';
import { SearchResultList } from '../components/search';

const ResultsPage = () => {
  const { query } = useParams();
  
  return (
    <BaseLayout>
      { query !== '' && <SearchResultList query={query} />}
    </BaseLayout>
  );
};

export default ResultsPage;