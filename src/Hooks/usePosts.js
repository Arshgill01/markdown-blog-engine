import { useState, useEffect } from "react";




export function usePosts(){

  let [posts, setPosts] = useState([ ])
  
    useEffect(()=>{
      fetch('/posts.json')
        .then(response=>response.json())
        .then(data=>{setPosts(data)})
        .catch(error=>{
          console.log("Error fetching the post list, Error: ", error)
        });
          setPosts([]);
  
    }, [])
    
    return posts;
}