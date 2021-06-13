import dayjs from 'dayjs';
import useFetch from '../../hooks/useFetch';
import styles from './Person.module.scss';

const Person = ({ person }) => {
  const [data, isLoading, error] = useFetch(`person/${person.id}`);
  return (
    <article className={styles.person}>
      <picture className={styles.picture}>
        <img src={`https://themoviedb.org/t/p/w600_and_h900_bestv2${person.profile_path}`} alt={person.name}/>
      </picture>
      <div className={styles.content}>
        <h3 className={styles.title}>{person.name}</h3>
        <span className={styles.rating}>{dayjs().$y - dayjs(data.birthday).$y}</span>
      </div>
    </article>
  )
};

export default Person;