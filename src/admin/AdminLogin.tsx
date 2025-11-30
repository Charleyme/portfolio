import { useState } from "react";
import { Box, Button, Input, Heading, VStack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axiosClient.post("/admin/login", {
        username,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);

      toast({
        title: "Login successful",
        status: "success",
        duration: 2000,
      });

      navigate("/admin/dashboard");
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.response?.data?.message || "Invalid credentials",
        status: "error",
      });
    }
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={4} p={8} borderRadius="lg" bg="white" boxShadow="lg">
        <Heading size="lg">Admin Login</Heading>

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button colorScheme="blue" width="full" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminLogin;
