import styles from "./StaticPage.module.css";

export function StaticPage({ title, children }) {
  return (
    <section className={styles.staticPageContainer}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
