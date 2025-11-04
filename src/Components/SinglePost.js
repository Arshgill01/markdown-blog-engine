import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import styles from "./SinglePost.module.css";

export function SinglePost(){
  const { slug } = useParams();
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const loadPost = async () => {
      try {
        const filePath = `${process.env.PUBLIC_URL}/posts/${slug}.md`;
        const response = await fetch(filePath, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error("Post not found");
        }

        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching post:", error);
          setMarkdownContent(`Post not found\nCould not find the content for slug: ${slug}`);
        }
      }
    };

    loadPost();

    return () => abortController.abort();
  }, [slug]);

  return (
    <div className={styles.singlePostContainer}>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
}
