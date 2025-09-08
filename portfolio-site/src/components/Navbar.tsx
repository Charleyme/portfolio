import React, { useEffect, useState } from "react";
import "./Navbar.css"; // 👈 for active link styling
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll"; // 👈 smooth scroll

interface NavbarItems {
  title: string;
  link: string; // must match section id
}

interface NavbarProps {
  listItems: NavbarItems[];
  logo: string;
}

const MotionStack = motion(Stack);

const Navbar = ({ listItems, logo }: NavbarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll === 0) {
        setShowNavbar(true);
        setScrolled(false);
      } else if (currentScroll > lastScrollY && currentScroll < 200) {
        setShowNavbar(false);
      } else if (currentScroll >= 200) {
        setShowNavbar(true);
        setScrolled(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Box
      as="nav"
      position="fixed"
      top={showNavbar ? "0" : "-80px"}
      left="0"
      right="0"
      transition="top 0.4s ease-in-out, background-color 0.4s ease-in-out, color 0.4s ease-in-out"
      px={6}
      py={4}
      zIndex={1000}
      bg={scrolled ? "white" : "transparent"}
      color={scrolled ? "black" : "white"}
      boxShadow={scrolled ? "md" : "none"}
      cursor="pointer"
    >
      <Flex justify={{ base: "space-between", md: "space-around" }} align="center">
        {/* Logo */}
        <Heading fontSize="lg">{logo}</Heading>

        {/* Desktop Menu */}
        <Flex display={{ base: "none", md: "flex" }} gap={6}>
          {listItems.map((item, index) => (
            <ScrollLink
              key={index}
              to={item.link}
              smooth={true}
              duration={600}
              offset={-70}
              spy={true}
              activeClass="active-link" // 👈 add this
            >
              {item.title}
            </ScrollLink>
          ))}
        </Flex>

        {/* Mobile Menu Button */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? "close" : "hamburger"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconButton
              aria-label="Toggle Menu"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              display={{ base: "flex", md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              variant="ghost"
            />
          </motion.div>
        </AnimatePresence>
      </Flex>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <MotionStack
            display={{ base: "flex", md: "none" }}
            mt={4}
            spacing={4}
            align="center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {listItems.map((item, index) => (
              <ScrollLink
                key={index}
                to={item.link}
                smooth={true}
                duration={600}
                offset={-70}
                spy={true}
                activeClass="active-link"
                onClick={onClose}
              >
                {item.title}
              </ScrollLink>
            ))}
          </MotionStack>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;
