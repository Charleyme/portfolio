import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { Post } from "../api/usePost";

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await axiosClient.get("/blog");
      setPosts(response.data);
    } catch (err: any) {
      setError("Error loading posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
};
