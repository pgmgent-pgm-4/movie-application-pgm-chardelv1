import { MdClose } from 'react-icons/md';

import React from 'react';
import styles from './SearchFilters.module.scss';

const SearchFilters = ({query}) => {
  return (
    <div className={styles.SearchFilters}>
      <p>Showing results for:</p> 
      <strong>{query}<MdClose /></strong>
    </div>
  )
}

export default SearchFilters;
