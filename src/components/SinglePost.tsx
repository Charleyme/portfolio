import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Heading,
  Text,
  Image,
  Box,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react";
import { useFetchSinglePost } from "../hooks/useFetchSinglePosts";

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = useFetchSinglePost(id || "");

  if (loading) {
    return (
      <Center py={20}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !post) {
    return (
      <Container py={10}>
        <Heading>Post not found</Heading>
        <Text mt={4}>Unable to load this post.</Text>
        <Button as={RouterLink} to="/blog" mt={6}>
          Back to Blog
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      {post.coverImage && <Image src={post.coverImage} alt={post.title} borderRadius="md" mb={6} />}
      <Heading mb={4}>{post.title}</Heading>
      <Text color="gray.500" mb={6}>
        {new Date(post.createdAt).toLocaleDateString()}
      </Text>

      <Box>
        <Text whiteSpace="pre-wrap">{post.content}</Text>
      </Box>

      <Button colorScheme="blue" as={RouterLink} to="/blog" mt={6}>
        Back to Blog
      </Button>
    </Container>
  );
};

export default SinglePost;
