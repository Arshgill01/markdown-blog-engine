import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

const postContent = {

  "first-title":`
# This post is related to the first entry.
* the first point.
* Random rambling.
* Now, I am literally just rambling 
`,
 "second-title":`
# This post is related to the second entry.
`,
  "third-title":`
# This post is realted to the Third entry.
  
  `

}
export function SinglePost(){
  const {slug} = useParams();




  const [markdownContentChange, setmarkdownContentChange] = useState("");
  

  useEffect(()=>{

    const content = postContent[slug] || `# Post Not Found\n\nCould not find content for slug: ${slug}`;
    setmarkdownContentChange(content);
  },[slug])

  return(
    <div>
      <ReactMarkdown>{markdownContentChange}</ReactMarkdown>
    </div>
  )
}
