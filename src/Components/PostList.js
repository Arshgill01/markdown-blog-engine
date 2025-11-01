import PostCard from "./PostCard";
import { useState, useEffect, useMemo } from "react";
import styles from "./PostList.module.css"
import { usePosts } from "../Hooks/usePosts";
  
function PostList(props){
  const posts = usePosts();
 
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(()=>{
    return posts.filter((post)=>{
    return post.title.toLowerCase().includes(searchTerm.toLowerCase())
  });
},[posts, searchTerm]);
  
  return(
    <div className={styles.postListContainer}>
      
      <input className={styles.inputSearch}onChange={
        (e)=>{
          setSearchTerm(e.target.value);

        }
      }
       placeholder="enter what you wanna search" value={searchTerm}/>


    {filteredPosts.length === 0 ? <p className={styles.noPostFoundContainer}>The entered item is not found</p>:filteredPosts.map((post)=>{
      return <PostCard key={post.slug} title={post.title} date={post.date}></PostCard>
    })}

    </div>
  );
}
export default PostList