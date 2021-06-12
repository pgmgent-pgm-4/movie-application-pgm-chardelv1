import React, { useContext } from 'react';
import { ThemeContext } from '../app/contexts/ThemeContext';
import styles from '../app/components/theme/ThemeToggler.module.scss';

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeToggle = (e) => {
    e.preventDefault();
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button className={styles.themeToggler} onClick={handleThemeToggle}>
      <span role="img" aria-label="switch theme">
        {theme ===  'light' ? '🌞' : '🔅'}
      </span>
    </button>
  )
}
export default ThemeToggler;
