import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHouse ,faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styles from "./Header.module.css"
import ThemeContext from './Context/ThemeContext';
import { useContext } from 'react';
function Header(props){
  const {theme, setTheme} = useContext(ThemeContext);


  const toggleTheme = ()=>{
    setTheme(currTheme => (currTheme === 'light'? 'dark': 'light'))
  }
  return(
    <header className={styles.header}>
      <div className={styles.title}><h1>Markdown-Blog-Engine</h1></div>
      <nav className={styles.nav}>
        <a href=''><FontAwesomeIcon icon={faHouse} /></a>
        <a href=''><FontAwesomeIcon icon={faAddressBook} /></a>
        <a href="">About</a>
        
      </nav>
      <button onClick={toggleTheme} className={styles.toggleThemeButton}> <FontAwesomeIcon icon={theme === 'light'? faMoon: faSun}></FontAwesomeIcon></button>
      
    </header>
  );
}

export default Header;