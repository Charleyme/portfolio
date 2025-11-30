import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Post } from "../api/usePost";

const MotionBox = motion(Box);

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.100");

  const excerpt =
    post.excerpt ||
    (post.content ? post.content.slice(0, 160).replace(/\n/g, " ") + "..." : "");

  return (
    <MotionBox
      bg={cardBg}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      {post.coverImage ? (
        <Image
          src={post.coverImage}
          alt={post.title}
          objectFit="cover"
          width="100%"
          height="160px"
        />
      ) : (
        <Box
          height="160px"
          bg={useColorModeValue("gray.50", "gray.700")}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="gray.400">No image</Text>
        </Box>
      )}

      <VStack align="start" spacing={3} p={4} flex="1">
        <Heading as="h3" size="md" color={textColor} noOfLines={2} >
          {post.title}
        </Heading>

        <Text fontSize="sm" color="gray.500">
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>

        <Text fontSize="sm" color={textColor} noOfLines={3}>
          {excerpt}
        </Text>

        <HStack mt="auto" width="100%" justify="flex-end">
          <Button
            as={Link}
            to={`/blog/${post._id}`}
            size="sm"
            colorScheme="green"
            aria-label={`Read more about ${post.title}`}
          >
            Read More
          </Button>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default PostCard;
