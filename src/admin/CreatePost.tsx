import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { Post } from "../api/usePost";

interface CreatePostProps {
  onCreate: (post: Post) => void;
}
const CreatePost = ({ onCreate }: CreatePostProps) => {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [coverImage, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast({
          title: "Unauthorized",
          description: "You must be logged in as Admin to create a post.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/admin/login");
        return;
      }
      const response = await axiosClient.post(
        "/blog/",
        {
          title,
          content,
          category,
          coverImage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (onCreate) {
        onCreate(response.data);
      }
      toast({
        title: "Post Created Successfully",
        description: "Your post has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/dashboard");
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Either token has expired ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Create error:", err);
    }
  };

  return (
    <Box p={10}>
      <Heading mb={6}>Create New Blog Post</Heading>

      <Stack spacing={4}>
        <Input
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />

        <Input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <Input
          placeholder="Image URL"
          value={coverImage}
          onChange={(e) => setImage(e.target.value)}
        />

        <Button colorScheme="green" onClick={handleSubmit}>
          Publish
        </Button>
      </Stack>
    </Box>
  );
};

export default CreatePost;
