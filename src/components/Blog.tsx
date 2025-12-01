import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Container,
  Spinner,
  Center,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import PostCard from "../components/PostCard";
import { useFetchPosts } from "../hooks/useFetchPosts";
import "./Blog.css";

const BlogPage: React.FC = () => {
  const { posts, loading, error, refetch } = useFetchPosts();

  return (
    <Box
     
      px={{
        base: "22px",
        sm: "45px",
        md: "45px",
        lg: "40px",
        xl: "75px",
      }}
      mt={14}
      py={10}
      bg="whiteAlpha.800"
      borderRadius="lg"
    >
      <Heading textAlign={"center"} mt={20} mb={10} color="black">
        Blogs
      </Heading>

      {loading ? (
        // simple skeleton grid while loading
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 8, lg: 10, xl: 10 }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="320px" borderRadius="lg" />
          ))}
        </SimpleGrid>
      ) : error ? (
        <Center py={16}>
          <Text color="red.500">Failed to load posts. Try again later.</Text>
        </Center>
      ) : posts.length === 0 ? (
        <Center py={16}>
          <Text color="gray.500">No posts yet.</Text>
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 8, lg: 10, xl: 10 }}
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default BlogPage;
