import React, { useState, useEffect } from "react";
import { Box, Flex, IconButton, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { motion, AnimatePresence } from "framer-motion";

import { Link as RouterLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const MotionBox = motion.div;

interface NavbarItems {
  title: string;
  link: string;
}

interface NavbarProps {
  listItems: NavbarItems[];
  logo: string;
  logo3?: string;
}

const MotionStack = motion(Stack);

const BlogNavbar = ({ listItems, logo, logo3 }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgColor = scrolled ? "white" : "gray.900";
  const linkColor = scrolled ? "black" : "white";

  // Helper to determine active link
  const isActiveLink = (link: string) => {
    // Blog page
    if (link === "/blog" && location.pathname === "/blog") return true;

    // Hash links back to home sections
    if (link.startsWith("/#") && location.pathname === "/") {
      const hash = link.replace("/#", "");
      return window.location.hash === `#${hash}`;
    }

    // Home link
    if (link === "/" && location.pathname === "/")
      return window.location.hash === "";

    return false;
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg={bgColor}
      color={linkColor}
      zIndex={1000}
      px={{ base: 4, sm: 10, md: 10, lg: "40px", xl: "80px" }}
      boxShadow={scrolled ? "md" : "none"}
      transition="all 0.3s ease"
    >
      <Flex justify="space-between" align="center">
        {/* Logo */}
        <RouterLink to="/">
          <Box
            as="img"
            src={scrolled ? logo : logo3 || logo}
            h="90px"
            cursor="pointer"
          />
        </RouterLink>

        {/* Desktop Links */}
        <Flex display={{ base: "none", lg: "flex" }} gap={16}>
          {listItems.map((item, index) =>
            item.link.startsWith("/#") ? (
              <HashLink
                key={index}
                smooth
                to={item.link}
                className={`nav-link ${
                  isActiveLink(item.link) ? "active" : ""
                }`}
                style={{ color: linkColor }}
              >
                {item.title}
              </HashLink>
            ) : (
              <RouterLink
                key={index}
                to={item.link}
                className={`nav-link ${
                  isActiveLink(item.link) ? "active" : ""
                }`}
                style={{ color: linkColor }}
              >
                {item.title}
              </RouterLink>
            )
          )}
        </Flex>

        {/* Mobile Menu Button */}

        <IconButton
          aria-label="Menu"
          variant="ghost"
          display={{ base: "flex", lg: "none" }}
          onClick={toggleMenu}
          fontSize={35}
          color={linkColor}
          style={{ perspective: "700px" }}
          icon={
            <MotionBox
              key={isOpen ? "close" : "open"}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }} // full turning spin
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformStyle: "preserve-3d",
              }}
            >
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </MotionBox>
          }
        />
      </Flex>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <MotionStack
            display={{ base: "flex", lg: "none" }}
            mt={4}
            spacing={4}
            align="center"
            bg={bgColor}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {listItems.map((item, index) =>
              item.link.startsWith("/#") ? (
                <HashLink
                  key={index}
                  smooth
                  to={item.link}
                  className={`nav-link ${
                    isActiveLink(item.link) ? "active" : ""
                  }`}
                  onClick={closeMenu}
                  style={{ color: linkColor }}
                >
                  {item.title}
                </HashLink>
              ) : (
                <RouterLink
                  key={index}
                  to={item.link}
                  className={`nav-link ${
                    isActiveLink(item.link) ? "active" : ""
                  }`}
                  onClick={closeMenu}
                  style={{ color: linkColor }}
                >
                  {item.title}
                </RouterLink>
              )
            )}
          </MotionStack>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default BlogNavbar;
