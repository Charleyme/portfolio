import {
  Box,
  Flex,
  Text,
  Heading,
  Stack,
  Icon,
  SimpleGrid,
  Button,
  Container,
} from "@chakra-ui/react";

import { FaReact, FaNodeJs, FaDatabase, FaGithub } from "react-icons/fa";
import { SiTypescript, SiMongodb } from "react-icons/si";
import Reveal from "./Reveal";

const About = () => {
  return (
    <Box bg="white" minH="100vh" >
      <Box
        display= "flex"
        flexDirection={{ base: "column", md: "row" }}
        p={20}
        minH="100vh"
        justifyContent={"space-between"}
        gap={10}

  
      >
        {/* LEFT - Image */}
        <Reveal direction="scale">
          <Box
            w={{ base: "100%", md: "100%" }}
            h={{ base: "40vh", md: "100vh" }}
            ml={{ base: 0, md: 10 }}
            bgImage="url('img12.jpg')" // ✅ Ensure img12.jpg is inside /public
            bgPosition="center"
            bgSize="cover"
            borderRadius="lg"
            shadow="lg"
          />
        </Reveal>

        {/* RIGHT - About Me Text & Skills */}
        <Reveal direction="right">
          <Box
          
            w={{ base: "100%", md: "100%" }}
            pt={12}
            pl={{ base: 0, md: 20 }}
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
            
          >
            <Container >
              <Heading mb={4} fontSize={{ base: "2xl", md: "3xl" }}>
                About Me
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} mb={4}>
                 Hi, I’m <b style={{ color: "#3182CE" }}>Charles</b>! I’m a{" "}
                <b>Full-Stack Developer</b> passionate about building
                interactive, scalable, and user-friendly web applications.
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} mb={4}>
                I work with{" "}
                <b>
                  React, TypeScript, Node.js, Express, MongoDB, and REST APIs
                </b>
                . I enjoy designing clean UIs with Chakra UI and connecting them
                with powerful backends.
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} mb={8}>
                I’ve built projects like real-time messaging systems,
                subscription platforms, and interactive games. I’m also
                exploring <b>cloud technologies</b> and{" "}
                <b>modern deployment pipelines</b>.
              </Text>

              {/* Skills Grid */}
              <Heading fontSize={{ base: "lg", md: "2xl" }} mb={6}>
                Tech Stack
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8} mb={8}>
                <Stack align="center">
                  <Icon as={FaReact} boxSize={10} color="blue.400" />
                  <Text>React</Text>
                </Stack>
                <Stack align="center">
                  <Icon as={SiTypescript} boxSize={10} color="blue.600" />
                  <Text>TypeScript</Text>
                </Stack>
                <Stack align="center">
                  <Icon as={FaNodeJs} boxSize={10} color="green.500" />
                  <Text>Node.js</Text>
                </Stack>
                <Stack align="center">
                  <Icon as={SiMongodb} boxSize={10} color="green.600" />
                  <Text>MongoDB</Text>
                </Stack>
                <Stack align="center">
                  <Icon as={FaDatabase} boxSize={10} color="purple.500" />
                  <Text>Databases</Text>
                </Stack>
                <Stack align="center">
                  <Icon as={FaGithub} boxSize={10} color="gray.700" />
                  <Text>Git/GitHub</Text>
                </Stack>
              </SimpleGrid>

              {/* Action Buttons */}
              <Flex gap={4} justify={{ base: "center", md: "flex-start" }}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  as="a"
                  href="/cv.pdf" // ✅ Place your CV file in /public/cv.pdf
                  download
                >
                  📄 Download CV
                </Button>
                <Button
                  colorScheme="teal"
                  size="lg"
                  as="a"
                  href="#contact" // ✅ Link to your Contact section
                >
                  📧 Contact Me
                </Button>
              </Flex>
            </Container>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
};

export default About;
