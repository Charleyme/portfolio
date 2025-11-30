import React, { useState, useEffect } from "react";
import {
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Box,
  Text,
  Show,
} from "@chakra-ui/react";
import { FiMenu, FiHome, FiFileText, FiSettings, FiUsers, FiSun, FiMoon } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { adminLogout } from "../utils/adminLogout";

const MotionBox = motion(Box);

interface NavItem {
  label: string;
  icon?: React.ReactNode;
  path?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <FiHome />, path: "/admin/dashboard" },
  { label: "Posts", icon: <FiFileText />, path: "/blog" },
  { label: "Settings", icon: <FiSettings />, path: "/admin/settings" },
  { label: "Create Post", icon: <FiFileText />, path: "/admin/create" },
  { label: "LogOut", icon: <FiUsers /> },
];

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (item.label === "LogOut") {
      adminLogout();
      return;
    }
    if (item.path) navigate(item.path);
    setIsOpen(false);
  };

  const sidebarContent = (
    <VStack align="stretch" spacing={4} mt={6}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <MotionBox
            key={item.label}
            as={Link}
            to={item.path || "#"}
            p={3}
            borderRadius="md"
            display="flex"
            alignItems="center"
            fontWeight={isActive ? "bold" : "normal"}
            bg={isActive ? "gray.700" : "transparent"}
            borderLeft={isActive ? "4px solid green" : "4px solid transparent"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            _hover={{ bg: "gray.700" }}
            onClick={() => handleNavClick(item)}
          >
            {item.icon && <Box mr={2}>{item.icon}</Box>}
            {item.label}
          </MotionBox>
        );
      })}
    </VStack>
  );

  return (
    <>
      {/* MOBILE TOPBAR */}
      <Show below="md">
        <Flex
          position="fixed"
          top="0"
          left="0"
          right="0"
          h="70px"
          bg={scrolled ? useColorModeValue("white", "gray.900") : "transparent"}
          color={scrolled ? useColorModeValue("black", "white") : "white"}
          align="center"
          justify="space-between"
          px={6}
          boxShadow={scrolled ? "md" : "none"}
          zIndex={2000}
        >
          <Text fontWeight="bold" fontSize="xl">
            Admin Panel
          </Text>

          <Flex gap={2} align="center">


            {/* Hamburger */}
            <IconButton
              aria-label="Open Menu"
              icon={<FiMenu />}
              variant="ghost"
              fontSize={28}
              color={scrolled ? useColorModeValue("black", "white") : "black"}
              onClick={() => setIsOpen(true)}
            />
          </Flex>
        </Flex>
      </Show>

      {/* MOBILE DRAWER */}
      <Drawer isOpen={isOpen} placement="left" onClose={() => setIsOpen(false)}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("gray.900", "gray.800")} color="white">
          <DrawerBody mt={10}>{sidebarContent}</DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* DESKTOP SIDEBAR */}
      <Show above="md">
        <Box
          w="260px"
          h="100vh"
          position="fixed"
          bg={useColorModeValue("gray.900", "gray.800")}
          color="white"
          p={6}
          boxShadow="xl"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={10}>
            Admin Panel
          </Text>
          {sidebarContent}
        </Box>
      </Show>
    </>
  );
};

export default AdminNavbar;
