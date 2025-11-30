import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Flex,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axiosClient from "../api/axiosClient";
import PostTable from "./BlogTable";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { useFetchPosts } from "../hooks/useFetchPosts";

const AdminDashboard = () => {
  const { posts, loading, refetch } = useFetchPosts();
  
  const navigate = useNavigate();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");


  return (
    <AdminLayout>
      <Box p={{base:4, lg:10}}>
        {/* Page Header */}
        <Flex justify="space-between" align="center" mb={10}>
          <Heading size="lg" fontWeight="bold">
            Admin Dashboard
          </Heading>

          <Button
            colorScheme="green"
            onClick={() => navigate("/admin/create")}
              display={{base:"none", lg:"block"}}
            >
              + Create New Post
            </Button>
        </Flex>

        {/* Stats Section */}
        <Flex gap={6} mb={10} flexWrap="wrap">
          <Box
            bg={cardBg}
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            minW={{base:"100%", lg:"250px"}}
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              Total Posts
            </Text>
            <Heading mt={1} size="lg">
              {posts.length}
            </Heading>
          </Box>

          <Box
            bg={cardBg}
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            minW={{base:"100%", lg:"250px"}}
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              Active Admin
            </Text>
            <Heading mt={1} size="lg">
              You
            </Heading>
          </Box>
        </Flex>

        {/* Table Section */}
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="md"
        >
          <Heading size="md" mb={4}>
            Blog Posts
          </Heading>

          {loading ? (
            <Flex justify="center" py={10}>
              <Spinner size="lg" />
            </Flex>
          ) : (
            <PostTable posts={posts} loading={loading} refetch={refetch}/>
          )}
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
