// src/components/Services.tsx
import React from "react";
import {
  Box,
  Grid,
  Heading,
  Flex,
  Text,
  useColorModeValue,
  scaleFadeConfig,
} from "@chakra-ui/react";
import {
  FaCode,
  FaServer,
  FaLaptopCode,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { motion, transform } from "framer-motion";
import Reveal from "./Reveal";
import "./Services.css"

const MotionBox = motion(Box);

type Service = {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  colorHex: string; // explicit hex color for icon + glow
};

const services: Service[] = [
  {
    icon: FaCode,
    title: "Frontend Development",
    desc: "Responsive, accessible, modern UIs with React, TypeScript & Chakra UI.",
    colorHex: "#3182CE", // Chakra blue.500
  },
  {
    icon: FaServer,
    title: "Backend Development",
    desc: "APIs and server-side systems using Node.js, Express, and databases.",
    colorHex: "#38A169", // Chakra green.500
  },
  {
    icon: FaLaptopCode,
    title: "Full-Stack Solutions",
    desc: "End-to-end apps connecting frontend + backend and deployments.",
    colorHex: "#805AD5", // Chakra purple.500
  },
  {
    icon: FaCloudUploadAlt,
    title: "Deployment & Hosting",
    desc: "Deployments, CI/CD, and cloud setup for reliable production apps.",
    colorHex: "#DD6B20", // Chakra orange.500
  },
];

const Services: React.FC = () => {
  // Section background adapts to color mode so it won't unexpectedly go dark.
  const sectionBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box id="services" mb={50} width={"100%"}  p={{ base: "22px",  sm:"45px", md: 12 ,lg:10, xl:20}} >
      <Reveal direction="up">
        <Heading textAlign="center" mb={10} color={textColor}>
          My Services
        </Heading>
      </Reveal>

      <Grid className="services"
      
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr",
          lg: "1fr 1fr 1fr",
        }}
        gap={{base:6, lg: 9, xl:9}}
      >
        {services.map((service, i) => {
          const Icon = service.icon;
          // rgba from hex: append 33 for ~20% alpha (e.g. #3182CE33)
          // This creates a subtle glow color that works both in light and dark.
          const glow = `${service.colorHex}33`;

          return (
            <Reveal key={i} direction="up" delay={i * 0.18}>
              <MotionBox
                p={6}
                bg={cardBg}
                borderRadius="xl"
                shadow="md"
                textAlign="center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.18 }}
                whileHover={{ scale: 1.04 }}
                // subtle colored glow on hover using explicit hex+alpha
                _hover={{
                  boxShadow: `0 10px 30px ${glow}`,
                  cursor: "pointer",
                  transform: "scale(1.03)",
                }}
              >
                {/* Icon: animate on reveal and on hover */}
                <MotionBox
                  mb={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.25,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -8, 8, 0],
                    transition: { duration: 0.35 },
                  }}
                >
                  <Icon size={36} color={service.colorHex} />
                </MotionBox>

                <Heading size="md" mb={2} color={textColor}>
                  {service.title}
                </Heading>

                <Text color={useColorModeValue("gray.600", "gray.300")}>
                  {service.desc}
                </Text>
              </MotionBox>
            </Reveal>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Services;
