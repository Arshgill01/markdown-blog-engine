import styles from "./PostCard.module.css"
function PostCard(props){
  const {title, date} = props;
  return(
    <div className={styles.PostCard}>
      <h2 className={styles.PostTitle}>{title}</h2>
      <date className={styles.PostDate}>{date}</date>
    </div>
  );
}

export default PostCard