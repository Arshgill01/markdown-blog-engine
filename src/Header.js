import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHouse } from '@fortawesome/free-solid-svg-icons';

function Header(props){
  return(
    <header className="header">
      <div className="title-div"><h1>Markdown-Blog-Engine</h1></div>
      <nav>
        <a href=''><FontAwesomeIcon icon={faHouse} /></a>
        <a href=''><FontAwesomeIcon icon={faAddressBook} /></a>
        <a href="">About</a>
        
      </nav>
    </header>
  );
}

export default Header;