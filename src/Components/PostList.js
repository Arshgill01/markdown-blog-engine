import PostCard from "./PostCard";
import { useState } from "react";
function PostList(props){
  
  const posts = [
    { title: "First Title", date: "26/10/25" },
    { title: "Second Title", date: "27/10/25" },
    { title: "Third Title", date: "28/10/25" }
  ];
  const [type, setType] = useState("");
  
  return(
    <div>
      {posts.map((post, idx) => (
        <PostCard key={idx} title={post.title} date={post.date}></PostCard>
      ))}
      <input onChange={
        (e)=>{
          setType(e.target.value);

        }
      }
       placeholder="enter what you wanna search"></input>


    <button onClick={()=>{
     
    posts.forEach((post) => {
      if (post.title.includes(type)) {
        console.log("Found");
      } else {
        console.log("Not Found");
      }
    });
    }}>Add</button>

    </div>
  );
}
export default PostList