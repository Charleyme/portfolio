// src/components/Portfolio.tsx
import React from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import ProjectCard from "./ProjectsCard";
import Reveal from "./Reveal";
import "./Portfolio.css";
import { isProjectNew } from "../utils/isProjectNew";

// -------------------------------
// Projects with a "date" field
// -------------------------------
const projects = [
  {
    title: "Game Finder App",
    description: "Search games, see ratings, filter by category",
    tech: ["React", "RawG API", "TypeScript", "Chakra UI"],
    demo: "https://demo.com",
    github: "https://github.com/Charleyme/GameFinderapp",
    image:
      "https://res.cloudinary.com/dico80rwt/image/upload/v1763498762/godofwar_btlv4o.jpg",
    date: "2025-11-18",
  },
  {
    title: "Todo App",
    description: "Manage your daily tasks efficiently.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB"],
    demo: "https://demo.com",
    github: "https://github.com/Charleyme/secrets",
    image:
      "https://res.cloudinary.com/dico80rwt/image/upload/v1761739165/img12_ghnkyg.jpg",
    date: "2025-01-10",
  },
];

// -------------------------------
// Sort: newest → oldest
// -------------------------------
const sortedProjects = [...projects].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const Portfolio = () => {
  const hasNewProjects = sortedProjects.some((p) => isProjectNew(p.date));

  return (
    <Box
      // className="about-section"
      id="projects"
      mb={20}
      px={{
        base: "22px",
        sm: "45px",
        md: "45px",
        lg: "40px",
        xl: "75px",
      }}
    >
      {/* Heading */}
      <Reveal direction="up">
        <Heading textAlign="center" mb={10}>
          My Projects
        </Heading>
      </Reveal>

      {/* 🔥 Banner if there are new projects */}
      {hasNewProjects && (
        <Reveal direction="up">
          <Box
            bg="green.50"
            borderRadius="md"
            p={4}
            mb={10}
            textAlign="center"
            border="1px solid #A0DAB0"
          >
            <Text fontWeight="bold" color="green.700">
              New project(s) added recently! 🎉 Check them out below.
            </Text>
          </Box>
        </Reveal>
      )}

      {/* 🔥 Recently Added Section */}
      {hasNewProjects && (
        <>
          <Reveal direction="up">
            <Heading size="md" mb={6}>
              Recently Added
            </Heading>
          </Reveal>

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 8, lg: 10, xl: 10 }}
            mb={16}
          >
            {sortedProjects
              .filter((p) => isProjectNew(p.date))
              .map((project, i) => (
                <Reveal key={i} direction="up">
                  <ProjectCard
                    {...project}
                    isNew={true} // 👈 Pass isNew = true
                  />
                </Reveal>
              ))}
          </SimpleGrid>
        </>
      )}

      {/* 🔥 All Projects Section */}
      <Reveal direction="up">
        <Heading size="md" mb={6}>
          All Projects
        </Heading>
      </Reveal>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 8, lg: 10, xl: 10 }}
      >
        {sortedProjects.map((project, i) => (
          <Reveal key={i} direction="up">
            <ProjectCard
              {...project}
              isNew={isProjectNew(project.date)} // 👈 Automatically pass new
            />
          </Reveal>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Portfolio;
