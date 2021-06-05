import { Link } from "react-router-dom";

import * as Routes from '../../routes';

import styles from './Footer.module.scss';

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; {fullYear} Charlotte Delvaux</p>
    </footer>
  );
};

export default Footer;