import styles from "./PostCard.module.css"
import {Link} from "react-router-dom"
function PostCard(props){
  const {title, date, slug} = props;
  return(
    <div className={styles.PostCard}>
      <Link to={`/post/${slug}`}>
      <h2 className={styles.PostTitle}>{title}</h2>
      </Link>
      <date className={styles.PostDate}>{date}</date>
    </div>
  );
}

export default PostCard