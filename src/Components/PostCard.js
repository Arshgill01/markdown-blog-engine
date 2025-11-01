import styles from "./PostCard.module.css"
function PostCard(props){
  const {title, date, slug} = props;
  return(
    <div className={styles.PostCard}>
      <h2 className={styles.PostTitle}>{title}</h2>
      <button onClick={()=>{

      }}>Open</button>
      <date className={styles.PostDate}>{date}</date>
    </div>
  );
}

export default PostCard