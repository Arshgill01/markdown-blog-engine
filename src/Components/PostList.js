import PostCard from "./PostCard";
import { useState, useEffect } from "react";
import styles from "./PostList.module.css"
  const allPosts = [
    { title: "First Title", date: "26/10/25", slug: "first title" },
    { title: "Second Title", date: "27/10/25", slug: "second title" },
    { title: "Third Title", date: "28/10/25", slug: "third title"}
  ];
function PostList(props){

  let [posts, setPosts] = useState([ ])

  useEffect(()=>{
    setPosts(allPosts)

  }, [])
  

  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post)=>{
    return post.title.toLowerCase().includes(searchTerm.toLowerCase())
  })
  
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