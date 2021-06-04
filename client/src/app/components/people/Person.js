import styles from './Person.module.scss';

const Person = ({ person }) => {
  console.log(person);

  return (
    <div className={styles.person}>
      <h2>{person.name}</h2>
      <ul>
        {person.known_for.map(media => <li key={media.id}>{media.original_title}</li>)}
      </ul>
    </div>
  )
};

export default Person;