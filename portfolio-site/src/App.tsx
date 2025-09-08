import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import "./App.css";
import Portfolio from "./components/Portfolio";
import { Box } from "@chakra-ui/react";

const App = () => {
  const NavbarItems = [
    { title: "Home", link: "home" },
    { title: "About", link: "about" },
    { title: "Projects", link: "projects" },
    { title: "Services", link: "services" },
    { title: "Resume", link: "resume" },
    { title: "Blog", link: "blog" },
    { title: "Contact", link: "contact" },
  ];
  return (
    <>
      <Box id="home">
        <div className="house">
          <Navbar listItems={NavbarItems} logo="Charles_Dev" />
          <Hero
            title="Welcome to My Portfolio"
            subtitle="I'm Charles, a Full-Stack Developer."
            highlight="Full-Stack Developer"
          />
        </div>
      </Box>

      <Box id="about">
        <About />
      </Box>
      <Box id="projects">
        <Portfolio />
      </Box>
    </>
  );
};

export default App;
