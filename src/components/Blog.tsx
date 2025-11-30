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

const BlogPage: React.FC = () => {
  const { posts, loading, error, refetch } = useFetchPosts();

  return (
    <Container maxW="container.xl" mt={14} py={10} bg="whiteAlpha.800" borderRadius="lg">
      <Heading textAlign={"center"} mb={6} color="white">Blogs</Heading>

      {loading ? (
        // simple skeleton grid while loading
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
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
        <Box px={{base:2, md:9, lg:16}}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Container>
  );
};

export default BlogPage;
