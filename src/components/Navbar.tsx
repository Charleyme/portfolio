import React, { useEffect, useState } from "react";
import "./Navbar.css"; // 👈 for active link styling
import { Box, Flex, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll"; // 👈 smooth scroll

interface NavbarItems {
  title: string;
  link: string; // must match section id
}

interface NavbarProps {
  listItems: NavbarItems[];
  logo: string; // image path
  logo3: string; // optional second logo image path
}

const MotionStack = motion(Stack);

const Navbar = ({ listItems, logo, logo3 }: NavbarProps) => {
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
      // pr={{ base:4,sm: 10, md:10,lg:"70px" , xl: "100px"}}
      // pl={{ base:4,sm:10, md: 10, lg: 0}}
      px={{ base: 4, sm: 10, md: 10, lg: 2, xl: 2, "2xl": 40}}
      
      

   
      transition="top 0.4s ease-in-out, background-color 0.4s ease-in-out, color 0.4s ease-in-out"
      zIndex={1000}
      bg={scrolled ? "white" : "transparent"}
      color={scrolled ? "black" : "white"}
      boxShadow={scrolled ? "md" : "none"}
      cursor="pointer"
      className="navbar"
    >
      <Flex
        justify={{ base: "space-between", md: "space-between", lg:"space-around"}}
        align="center"
      >
        {/* Logo Image */}
        <ScrollLink to="home" smooth={true} duration={600} offset={-70}>
          <Box
            as="img"
            src={scrolled ? logo : logo3}
            alt="Logo"
            cursor="pointer"
            h="90px"
            mr={{ base: "0px", md: "10px" }} // ✅ responsive margin
            objectFit="cover"
            position={"relative"}
            // left={{ base: "-4px", md: "-4px", lg:"5px", xl: "-11px" }}
            className="logo-image"
            
          />
        </ScrollLink>

        {/* Desktop Menu */}
        <Flex display={{ base: "none", md: "none", lg:"flex"}} gap={16}>
          {listItems.map((item, index) => (
            <ScrollLink
              key={index}
              to={item.link}
              smooth={true}
              duration={600}
              offset={-70}
              spy={true}
              activeClass={item.link === "home" ? "" : "active"} // ✅ home never green
              className={`nav-link ${scrolled ? "scrolled" : ""} ${
                item.link === "home" ? "home-link" : ""
              }`}
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
              display={{ base: "flex", md: "flex",lg: "none" }}
              onClick={isOpen ? onClose : onOpen}
              variant="ghost"
              color={scrolled ? "black" : "white"}
              fontSize={35}
            />
          </motion.div>
        </AnimatePresence>
      </Flex>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <MotionStack
            display={{ base: "flex", md: "flex", lg:"none" }}
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
                activeClass={item.link === "home" ? "" : "active"} // ✅ home never green
                className={`nav-link ${
                  item.link === "home" ? "home-link" : ""
                }`}
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
