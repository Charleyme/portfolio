import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  useToast,
  Box,
  Text,
  Flex,
  Spinner,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Post } from "../api/usePost";
import { useDeletePost } from "../hooks/useDeletePosts";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";

interface BlogTableProps {
  posts: Post[];
  refetch: () => void;
  loading: boolean;
}

const BlogTable = ({ posts, refetch, loading }: BlogTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { deletePost, loading: deleting } = useDeletePost();
  const toast = useToast();
  const navigate = useNavigate();

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    onOpen();
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    const success = await deletePost(selectedId, () => refetch());

    if (success) {
      toast({
        title: "Post deleted",
        description: "The post was removed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Unable to delete post.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    onClose();
  };

  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (loading) {
    return (
      <Flex justify="center" py={10}>
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (posts.length === 0) {
    return (
      <Text mt={4} textAlign="center" color="gray.500">
        No posts found.
      </Text>
    );
  }

  return (
    <Box overflowX="auto" w="100%">
      {isMobile ? (
        // Mobile card layout
        <Stack spacing={4}>
          {posts.map((post) => (
            <Box
              key={post._id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              boxShadow="sm"
            >
              <Text fontWeight="bold">{post.title}</Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(post.createdAt).toLocaleDateString()}
              </Text>
              <Flex mt={2} gap={2}>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  colorScheme="blue"
                  onClick={() => navigate(`/admin/edit/${post._id}`)}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => openDeleteModal(post._id)}
                />
              </Flex>
            </Box>
          ))}
        </Stack>
      ) : (
        // Desktop table layout
        <Table variant="simple" minW="600px">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <Tr key={post._id}>
                <Td>{post.title}</Td>
                <Td>{new Date(post.createdAt).toLocaleDateString()}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="blue"
                      onClick={() => navigate(`/admin/edit/${post._id}`)}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => openDeleteModal(post._id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </Box>
  );
};

export default BlogTable;
