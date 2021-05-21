import MainNavigation from './MainNavigation';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <MainNavigation />
    </header>
  );
};

export default Header;