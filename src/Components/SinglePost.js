import { useParams } from "react-router-dom";
import {ReactMarkdown} from "react-markdown";
export function SinglePost(){
  const {slug} = useParams();


  return(
    <div>
      Post slug: {slug}
      
    </div>
  )
}
