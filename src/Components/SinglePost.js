import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";


export function SinglePost(){
  const {slug} = useParams();




  const [markdownContentChange, setmarkdownContentChange] = useState("");
  

  useEffect(()=>{

    const filePath = `/posts/${slug}.md`
    fetch(filePath)
      .then(response =>{
        if(response.ok){
          return response.text();
        }
        throw new Error("Post not Found")
        })
      .then(text=>{
        setmarkdownContentChange(text);
      })
      .catch(error=>{
        console.log("Error Fetching post : " ,error);
        setmarkdownContentChange(`Post not found/n Could not find the content for slug:${slug}`);
      });
    }, [slug]);
     

  return(
    <div>
      <ReactMarkdown>{markdownContentChange}</ReactMarkdown>
    </div>
  )
}
