import { useState, useEffect } from "react";

export function usePosts(){
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadPosts = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/posts.json`, {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching the post list:", error);
          setPosts([]);
        }
      }
    };

    loadPosts();

    return () => abortController.abort();
  }, []);

  return posts;
}