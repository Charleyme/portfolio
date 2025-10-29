import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import "./App.css";
import Portfolio from "./components/Portfolio";
import { Box } from "@chakra-ui/react";
import Services from "./components/Services"; 
import Contact from "./components/Contact";
import Footer from "./components/Footer";



const App = () => {
  const NavbarItems = [
    { title: "Home", link: "home" , type: "scroll"},
    { title: "About", link: "about" , type: "scroll"},
    { title: "Projects", link: "projects" ,type: "scroll"},
    { title: "Services", link: "services" ,type: "scroll"},
    { title: "Resume", link: "resume" ,type: "scroll"},
    { title: "Blog", link: "blog" ,type: "scroll" },
    { title: "Contact", link: "contact",type:"route" },
  ];
  const avatar = "https://res.cloudinary.com/dico80rwt/image/upload/f_auto,q_auto/logo_bemxyj.png";


  const avatar2 =   "https://res.cloudinary.com/dico80rwt/image/upload/f_auto,q_auto/logo3_uxlawu.png"
  return (
    <>
      <Box id="home">
        <div className="house">
          <Navbar listItems={NavbarItems} logo= {avatar} logo3={avatar2} />
          <Hero 
            subtitle="I'm Charles, a Full-Stack Developer."
            highlight="Full-Stack Developer"
          />
        </div>
      </Box>

      <Box id="about">
        <About/>
      </Box> 
       <Box id="projects">
        <Portfolio />
      </Box> 
      <Box id="services">
        <Services />
      </Box>
       <Box id="contact">
        <Contact />
      </Box> 
       <Footer/>
    </>
  );
};

export default App;
