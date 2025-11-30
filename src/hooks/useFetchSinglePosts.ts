

import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Post } from "../api/usePost";

export const useFetchSinglePost = (id: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    if (!id) return;
    try {
      const res = await axiosClient.get(`/blog/${id}`);
      setPost(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return { post, loading, error, refetch: fetchPost };
};
