import { useParams } from 'react-router-dom';

import { BaseLayout } from '../layouts';
import { SearchFilters, SearchResultList } from '../components/search';

const ResultsPage = () => {
  const { query } = useParams();
  
  return (
    <BaseLayout>
      <SearchFilters query={query} />
      <SearchResultList query={query} />
    </BaseLayout>
  );
};

export default ResultsPage;