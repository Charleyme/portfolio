// src/components/Portfolio.tsx
import React from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import ProjectCard from "./ProjectsCard";
import Reveal from "./Reveal";
import "./Portfolio.css"
const projects = [
  {
    title: "Movie Finder App",
    description: "Search movies, see ratings, and save favorites.",
    tech: ["React", "TMDB API", "Chakra UI"],
    demo: "https://demo.com",
    github: "https://github.com/username/movie-finder",
    image: "img12.jpg",
  },
  {
    title: "Todo App",
    description: "Manage your daily tasks efficiently.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB"],
    demo: "https://demo.com",
    github: "https://github.com/Charleyme/secrets",
    image: "img12.jpg",
  },
  // more projects
];

const Portfolio = () => {
  return (
    
    <Box  className="about-section" id="projects" p={{base:0}} mb={20} px={{ base: "22px",sm:"45px", md:"45px",lg:"40px", xl:"75px" }} >
      <Reveal direction="up">
          <Heading textAlign="center" mb={10}>My Projects</Heading>
      </Reveal>
    

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{base: 8, lg:10, xl:10}}>

        {projects.map((project, i) => (
          <Reveal key={i} direction="up">
            <ProjectCard  {...project} />
          </Reveal>
        ))}

      </SimpleGrid>
    </Box>
  );
};

export default Portfolio;

