import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import {
  Box,
  Heading,
  Button,
  Stack,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
const EditPost = () => {
  const toast = useToast();
  const { id } = useParams();
  const postId = id!;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setImage] = useState("");

  // LOAD TOKEN
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "You must be logged in as Admin to edit a post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/admin/login");
      return;
    }

    axiosClient
      .get(`blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.coverImage);
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to load post.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [postId, token, navigate]);

  const save = async () => {
    try {
      await axiosClient.put(
        `blog/${id}`,
        {
          title,
          content,
          coverImage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Post Updated Successfully",
        description: "The post has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update post.");
    }
  };
  return (
    <Box p={10}>
      <Heading mb={6}>Edit Blog Post</Heading>

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
          placeholder="Image URL"
          value={coverImage}
          onChange={(e) => setImage(e.target.value)}
        />
        
        <Button colorScheme="green" onClick={save}>
          Save
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          Back to Dashboard
        </Button>
      </Stack>
    </Box>
  );
};

export default EditPost;
