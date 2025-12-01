import React from "react";
import { Box, Heading, Text, HStack, Tag, Link, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  demo?: string;
  github?: string;
  image: string;
  isNew?: boolean; // 👈 ADD THIS
}

const MotionBox = motion(Box);

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  demo,
  github,
  image,
  isNew, // 👈 RECEIVE IT
}) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      shadow="md"
      overflow="hidden"
      position="relative" // 👈 IMPORTANT for the badge
      _hover={{ transform: "scale(1.03)", shadow: "lg" }}
      transition="0.3s"
      cursor="pointer"
      
    >
      {/* 🔥 NEW Badge */}
      {isNew && (
        <Box
          bg="green.500"
          color="white"
          px={3}
          py={1}
          fontSize="xs"
          borderRadius="md"
          fontWeight="bold"
          position="absolute"
          top={2}
          right={2}
          zIndex={10}
          boxShadow="md"
        >
          NEW 
        </Box>
      )}

      {/* Image with hover pop-out */}
      <MotionBox
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        w="100%"
        h={{ base: "200px", md: "350px" }}
        bgImage={`url(${image})`}
        bgSize="cover"
        bgPosition="center"
      />

      {/* Content */}
      <Box p={4}>
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        <Text fontSize="sm" mb={3}>
          {description}
        </Text>

        {/* Tech Stack */}
        <HStack spacing={2} wrap="wrap" mb={3}>
          {tech.map((t, i) => (
            <Tag key={i} size="sm" colorScheme="teal">
              {t}
            </Tag>
          ))}
        </HStack>

        {/* Links */}
        <Flex gap={4}>
          {demo && (
            <Link href={demo} isExternal color="blue.500" fontWeight="bold">
              Demo
            </Link>
          )}
          {github && (
            <Link href={github} isExternal color="gray.700" fontWeight="bold">
              GitHub
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default ProjectCard;
