import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHouse, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import styles from "./Header.module.css";
import ThemeContext from './Context/ThemeContext';
import { useContext } from 'react';

function Header(){
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}><h1>Markdown-Blog-Engine</h1></div>
      <nav className={styles.nav}>
        <NavLink to="/" aria-label="Go to home" className={({ isActive }) => (isActive ? styles.activeLink : undefined)}>
          <FontAwesomeIcon icon={faHouse} />
        </NavLink>
        <NavLink to="/contact" aria-label="Contact" className={({ isActive }) => (isActive ? styles.activeLink : undefined)}>
          <FontAwesomeIcon icon={faAddressBook} />
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.activeLink : undefined)}>
          About
        </NavLink>
      </nav>
      <button onClick={toggleTheme} className={styles.toggleThemeButton} aria-label="Toggle theme">
        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
      </button>
    </header>
  );
}

export default Header;