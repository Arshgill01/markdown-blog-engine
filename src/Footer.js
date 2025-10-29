import styles from "./Footer.module.css"
function Footer(props){
  return(
    <footer className={styles.footer}>
      <p>2025 My Awesome App, Inc.</p>
      <div className={styles.footerLinks}>
        <a href="">Privacy Policy</a>
        <a href="">Terms of Service</a>
      </div>

    </footer>
  );
}
export default Footer