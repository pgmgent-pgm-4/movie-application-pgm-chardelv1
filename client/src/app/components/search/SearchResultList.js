import useFetch from '../../hooks/useFetch';
import styles from './SearchResultList.module.scss';
import SearchResultListItem from './SearchResultListItem';

const SearchResults = ({ query }) => {
  const [results, isLoading, error] = useFetch('search/multi', `query=${encodeURI(query)}&language=en-US`);
  console.table(results.results);

  return (
    <>
      <div className={styles.resultsList}>
        {isLoading && <p>Loading...</p>}
        {!!results && !!results.results && results.results.map(result => {
          return (
            <SearchResultListItem key={result.id} result={result} />
          )
          }
        )}
        {error && <p>Error: {error.message}</p>}
      </div>
    </>
  )
}

export default SearchResults;