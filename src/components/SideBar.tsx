import {
  Box,
  Flex,
  Text,
  VStack,
  Icon,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiFileText, FiSettings, FiUsers, FiMenu } from "react-icons/fi";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { adminLogout } from "../utils/adminLogout";

const MotionBox = motion(Box);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navItems = [
    { label: "Dashboard", icon: FiHome, path: "/admin/dashboard" },
    { label: "Posts", icon: FiFileText, path: "/blog" },
    { label: "Settings", icon: FiSettings, path: "/admin/settings" },
    { label: "Create Post", icon: FiFileText, path: "/admin/create" },
    { label: "LogOut", icon: FiUsers },
  ];

  const handleNavClick = (item: any) => {
    if (item.label === "LogOut") {
      adminLogout();
      return;
    }
    navigate(item.path || "/admin/login");
    onClose(); // close drawer on mobile
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
            <Icon as={item.icon} mr={3} />
            {item.label}
          </MotionBox>
        );
      })}
    </VStack>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        display={{ base: "none", md: "block" }}
        w="260px"
        h="100vh"
        position="fixed"
        bg={useColorModeValue("gray.900", "gray.800")}
        color="white"
        p={6}
        boxShadow="xl"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Admin Panel
        </Text>
        {sidebarContent}
      </Box>

      {/* Mobile Hamburger */}
      <Flex
        display={{ base: "flex", md: "none" }}
        position="fixed"
        top={4}
        left={4}
        zIndex={2000}
      >
        <IconButton
          aria-label="Open Menu"
          icon={<FiMenu />}
          onClick={onOpen}
          colorScheme="teal"
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("gray.900", "gray.800")} color="white">
          <DrawerCloseButton mt={2} />
          <DrawerBody mt={10}>{sidebarContent}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
