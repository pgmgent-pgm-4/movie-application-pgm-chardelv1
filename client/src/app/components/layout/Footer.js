import { Link } from "react-router-dom";

import * as Routes from '../../routes';

import styles from './Footer.module.scss';

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>Made by Charlotte Delvaux in {fullYear}<br/>for the course Programming 4<br/> in the Associate Degree in Computer Programming <br/> at Artevelde University of Applied Sciences.</p>
      <div>Favicons made by <a href="" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </footer>
  );
};

export default Footer;