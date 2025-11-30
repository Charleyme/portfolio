import React, { useEffect, useState } from "react";
import "./Navbar.css";

import {
  Box,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

import { Link as RouterLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface NavbarItems {
  title: string;
  link: string;
}

interface NavbarProps {
  listItems: NavbarItems[];
  logo: string;
  logo3: string;
}

const MotionStack = motion(Stack);

const Navbar = ({ listItems, logo, logo3 }: NavbarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const { pathname } = location;

  const [activeSection, setActiveSection] = useState<string>("#home");

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // -------------------------------
  // NAVBAR SHOW/HIDE ON SCROLL
  // -------------------------------
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current === 0) {
        setShowNavbar(true);
        setScrolled(false);
      } else if (current > lastScrollY && current < 200) {
        setShowNavbar(false);
      } else if (current >= 200) {
        setShowNavbar(true);
        setScrolled(true);
      }

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // -------------------------------
  // SCROLL-SPY: Detect which section is visible
  // -------------------------------
  useEffect(() => {
    const sectionIds = listItems
      .filter((item) => item.link.startsWith("/#"))
      .map((item) => item.link.replace("/", "")); // "/#about" → "#about"

    const handleScrollSpy = () => {
      let currentSection = "#home";

      for (let id of sectionIds) {
        const el = document.querySelector(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [listItems]);

  // -------------------------------
  // Active class resolver
  // -------------------------------
  const isActive = (link: string) => {
    if (link.startsWith("/#")) {
      const hash = link.replace("/", ""); // "/#projects" → "#projects"
      return activeSection === hash ? "active" : "";
    }

    if (link.startsWith("/") && !link.startsWith("/#")) {
      return pathname === link ? "active" : "";
    }

    return "";
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top={showNavbar ? "0" : "-80px"}
      left="0"
      right="0"
      px={{ base: 4, sm: 10, md: 10, lg: 4, xl: "80px" }}
      transition="top 0.4s ease, background-color 0.4s ease"
      bg={scrolled ? "white" : "transparent"}
      color={scrolled ? "black" : "white"}
      boxShadow={scrolled ? "md" : "none"}
      zIndex={1000}
      className="navbar"
    >
      <Flex justify="space-between"align="center">
        {/* LOGO */}
        <RouterLink to="/">
          <Box
            as="img"
            src={scrolled ? logo : logo3}
            h="90px"
            cursor="pointer"
            className="logo-image"
          />
        </RouterLink>

        {/* DESKTOP NAV */}
        <Flex display={{ base: "none", lg: "flex" }} gap={16}>
          {listItems.map((item, index) => {
            const isRoute = item.link.startsWith("/") && !item.link.startsWith("/#");
            const isHash = item.link.startsWith("/#");

            return isRoute ? (
              <RouterLink
                key={index}
                to={item.link}
                className={`nav-link ${isActive(item.link)} ${scrolled ? "scrolled" : ""}`}
              >
                {item.title}
              </RouterLink>
            ) : isHash ? (
              <HashLink
                key={index}
                smooth
                to={item.link}
                className={`nav-link ${isActive(item.link)} ${scrolled ? "scrolled" : ""}`}
              >
                {item.title}
              </HashLink>
            ) : null;
          })}
        </Flex>

        {/* MOBILE MENU */}
        <IconButton
          aria-label="Menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "flex", lg: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          fontSize={35}
          color={scrolled ? "black" : "white"}
        />
      </Flex>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <MotionStack
            display={{ base: "flex", lg: "none" }}
            mt={4}
            spacing={4}
            py={4}
            align="center"
            bg={scrolled ? "white" : "blackAlpha.800"}
            color={scrolled ? "black" : "white"}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {listItems.map((item, index) => {
              const isHash = item.link.startsWith("/#");
              return isHash ? (
                <HashLink
                  key={index}
                  smooth
                  to={item.link}
                  className={`nav-link ${isActive(item.link)}`}
                  onClick={onClose}
                >
                  {item.title}
                </HashLink>
              ) : (
                <RouterLink
                  key={index}
                  to={item.link}
                  className={`nav-link ${isActive(item.link)}`}
                  onClick={onClose}
                >
                  {item.title}
                </RouterLink>
              );
            })}
          </MotionStack>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;
