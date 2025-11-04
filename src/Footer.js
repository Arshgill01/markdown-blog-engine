import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer(){
  return (
    <footer className={styles.footer}>
      <p>2025 My Awesome App, Inc.</p>
      <div className={styles.footerLinks}>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
      </div>
    </footer>
  );
}

export default Footer;