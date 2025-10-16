import {
  Box,
  Flex,
  Text,
  HStack,
  Link,
  IconButton,
  Image,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa6";
import logo from "../assets/logo.png";
import Reveal from "./Reveal";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const text = useColorModeValue("gray.700", "gray.300");
  const heading = useColorModeValue("gray.800", "white");
  const border = useColorModeValue("gray.300", "gray.700");

  const [showButton, setShowButton] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowButton(true);
      else setShowButton(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      bg={bg}
      color={text}
      
      p={{ base: 6, lg: "20px", xl: 14 }}
      transition="background-color 0.4s ease, color 0.4s ease"
      position="relative"
    >
      {/* Existing footer content */}
      <Reveal direction="up">
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          justify="space-between"
          gap={8}
        >
          <VStack align={{ base: "center", md: "flex-start" } } px={7}>
            <Image
              src={logo}
              alt="Charles Dev Logo"
              h="60px"
              objectFit="cover"
            />
            <Text fontSize="sm">
              Full-Stack Developer | Building reliable and beautiful web systems.
            </Text>
          </VStack>

          <VStack align={{ base: "center", md: "flex-start" }}>
            <Text fontWeight="bold" color={heading} mb={2}>
              Quick Links
            </Text>
            <Link href="#home" _hover={{ color: "green.400" }}>
              Home
            </Link>
            <Link href="#about" _hover={{ color: "green.400" }}>
              About
            </Link>
            <Link href="#projects" _hover={{ color: "green.400" }}>
              Projects
            </Link>
            <Link href="#services" _hover={{ color: "green.400" }}>
              Services
            </Link>
            <Link href="#contact" _hover={{ color: "green.400" }}>
              Contact
            </Link>
          </VStack>

          <VStack align={{ base: "center", md: "flex-start" }}>
            <Text fontWeight="bold" color={heading} mb={2}>
              Connect With Me
            </Text>
            <HStack spacing={4}>
              <IconButton
                as={Link}
                href="mailto:charlesjiwueze826@gmail.com"
                aria-label="Email"
                icon={<FaEnvelope />}
                colorScheme="green"
                variant="ghost"
              />
              <IconButton
                as={Link}
                href="https://wa.me/2348160459227"
                aria-label="WhatsApp"
                icon={<FaWhatsapp />}
                colorScheme="green"
                variant="ghost"
              />
              <IconButton
                as={Link}
                href="https://github.com/Charleyme"
                aria-label="GitHub"
                icon={<FaGithub />}
                colorScheme="green"
                variant="ghost"
              />
              <IconButton
                as={Link}
                href="https://linkedin.com/in/CharlesJiwueze"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                colorScheme="green"
                variant="ghost"
              />
              <IconButton
                as={Link}
                href="https://twitter.com/CharlesJiwueze"
                aria-label="Twitter"
                icon={<FaTwitter />}
                colorScheme="green"
                variant="ghost"
              />
            </HStack>
          </VStack>
        </Flex>
      </Reveal>

      <Reveal direction="up" delay={0.3}>
        <Box
          borderTop="1px solid"
          borderColor={border}
          mt={10}
          pt={6}
          textAlign="center"
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} Charles Jiwueze. All rights reserved.
          </Text>
        </Box>
      </Reveal>

      {/* Scroll To Top Button */}

<AnimatePresence>
  {showButton && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 1000,
      }}
    >
      <IconButton
        icon={<FaArrowUp />}
        aria-label="Scroll to top"
        onClick={scrollToTop}
        colorScheme="green"
        borderRadius="full"
        boxShadow="lg"
        size="lg"
        transition="transform 0.3s ease"
        _hover={{ transform: "scale(1.1)" }}
      />
    </motion.div>
  )}
</AnimatePresence>
    </Box>
  );
};

export default Footer;
