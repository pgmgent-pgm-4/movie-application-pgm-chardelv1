import * as Routes from '../../routes';
import { Person } from '../people';
import { MovieListItem } from '../movies';
import { ShowListItem } from '../tv-shows';
import styles from './SearchResultListItem.module.scss';

const SearchResultListItem = ({ result }) => {
  console.log(result);
  switch (result.media_type) {
    case 'person':
      return <Person key={result.index} person={result} />
      break;
    case 'movie':
      return <MovieListItem key={result.index} movie={result} />
      break;
    case 'tv':
      return <ShowListItem key={result.index} show={result} />
    default:
      break;
  }  
}

export default SearchResultListItem;