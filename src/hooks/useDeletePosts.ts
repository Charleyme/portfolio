import { useState } from "react";
import axiosClient from "../api/axiosClient";




export const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const deletePost = async (id: string, onSuccess?: () => void) => {
    setLoading(true);

    try {
      await axiosClient.delete(`/blog/${id}`);
      if (onSuccess) onSuccess(); // refresh posts
      return true;
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading };
};

