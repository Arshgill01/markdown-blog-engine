import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from "./Header.module.css"

function Header(props){
  return(
    <header className={styles.header}>
      <div className={styles.title}><h1>Markdown-Blog-Engine</h1></div>
      <nav className={styles.nav}>
        <a href=''><FontAwesomeIcon icon={faHouse} /></a>
        <a href=''><FontAwesomeIcon icon={faAddressBook} /></a>
        <a href="">About</a>
        
      </nav>
    </header>
  );
}

export default Header;