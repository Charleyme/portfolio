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
import MotionBox from "./Reveal";
import "./About.css";

const About = () => {
  return (
    <Box
      className="parent-section"
      minH="auto"
      // pl={{ base: 0, md: 0, lg: 0, xl: "8px" }}
      mb={"200px"}
    >
      <Box
        className="about-section"
        display={"flex"}
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        minH="auto"
        justifyContent={{ base: "center", md: "center", lg: "space-between" }}
        alignItems={"center"}
        gap={{ base: 0, md: 0, lg: 12, xl: 14 }}
        px={{ base: "22px", sm: "45px", md: "45px", lg: "40px", xl: "77px" }}
        pt={20}
      >
        {/* LEFT - Image */}
        <Reveal direction="left">
          <MotionBox>
            <Box
              w={{ base: "100%", md: "100%",lg:"110%", xl: "110%" }}
              h={{ base:"60vh" , sm:"62vh", md: "75vh", lg: "96vh", xl: "135vh" }}
              mr={{ base: 0 }}
              mb={{ base: 20, md: 20, lg: 0 }}
              bgImage="url('avatar2.png')" // ✅ Ensure avatar2.png is inside /public
              bgPosition="center"
              bgSize="cover"
              borderRadius="lg"
              shadow="lg"
              className="image"
            />
          </MotionBox>
        </Reveal>

        {/* RIGHT - About Me Text & Skills */}

        {/* RIGHT - About Me Text & Skills */}
        <Reveal direction="right">
          <Box
            ml={{ base: 0, md: 0, lg: 7, xl: 7 }}
            p={{ base: 0, md: 0, lg: 10, xl: 10 }}
            w={{ base: "100%", md: "100%" }}
            display={"flex"}
            alignContent={{}}
            justifyContent={"center"}
          >
            <Box w={"100%"} p={0} color={"gray"}>
              <Heading
                color={"black"}
                fontFamily={"Open Sans,sans-serif"}
                mb={4}
                fontSize={{ base: "2xl", md: "5xl" }}
              >
                My Bio
              </Heading>
              <Text fontSize={{ base: "md", md: "16px" }} mb={4}>
                Hi, I’m <b style={{ color: "green" }}>Charles</b>! I’m a{" "}
                <b style={{ color: "green" }}>Full-Stack Developer</b>{" "}
                passionate about building interactive, scalable, and
                user-friendly web applications.
              </Text>
              <Text fontSize={{ base: "md", md: "16px" }} mb={4}>
                I work with React, TypeScript, Node.js, Express, MongoDB, and
                REST APIs . I enjoy designing clean UIs with Chakra UI and
                connecting them with powerful backends.
              </Text>
              <Text fontSize={{ base: "md", md: "16px" }} mb={8}>
                I’ve built projects like real-time messaging systems,
                subscription platforms, and interactive games. I’m also
                exploring <b style={{ color: "green" }}>cloud technologies</b>{" "}
                and{" "}
                <b style={{ color: "green" }}>modern deployment pipelines</b>.
              </Text>

              {/* Skills Grid */}
              <Heading
                color={"black"}
                fontSize={{ base: "lg", md: "2xl" }}
                mb={6}
              >
                Tech Stack
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8} mb={12}>
                <Stack align="start">
                  <Icon as={FaReact} boxSize={10} color="blue.400" />
                  <Text>React</Text>
                </Stack>
                <Stack align={"start"}>
                  <Icon as={SiTypescript} boxSize={10} color="blue.600" />
                  <Text>TypeScript</Text>
                </Stack>
                <Stack align={"start"}>
                  <Icon as={FaNodeJs} boxSize={10} color="green.500" />
                  <Text>Node.js</Text>
                </Stack>
                <Stack align={"start"}>
                  <Icon as={SiMongodb} boxSize={10} color="green.600" />
                  <Text>MongoDB</Text>
                </Stack>
                <Stack align={"start"}>
                  <Icon as={FaDatabase} boxSize={10} color="purple.500" />
                  <Text>Databases</Text>
                </Stack> 
                <Stack align={"start"}>
                  <Icon as={FaGithub} boxSize={10} color="gray.700" />
                  <Text>Git/GitHub</Text>
                </Stack>
              </SimpleGrid>

              {/* Action Buttons */}
              <Flex gap={4} justify={"flex-start"}>
                <Button
                  colorScheme="green"
                  size="lg"
                  as="a"
                  href="/CharlesJiwueze_CV.pdf" // ✅ Place your CV file in /public/cv.pdf
                  download
                >
                  Download CV
                </Button>
                <Button
                  color="blue.500"
                  size="lg"
                  as="a"
                  href="#contact" // ✅ Link to your Contact section
                >
                  Hire Me
                </Button>
              </Flex>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
};

export default About;
