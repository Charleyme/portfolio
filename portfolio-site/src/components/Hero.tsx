import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  highlight: string; // keyword/phrase to highlight
}

// Motion wrappers
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionSpan = motion.span;

const Hero = ({ title, subtitle, highlight }: HeroProps) => {
  // Split subtitle around the highlight phrase
  const parts = subtitle.split(highlight);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="white"
    >
      <Box textAlign="center">
        {/* Title with fade + up */}
        <MotionHeading
          fontSize="50px"
          mb={4}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {title}
        </MotionHeading>

        {/* Subtitle with highlight popping */}
        <MotionText
          fontSize="40px"
          display="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {parts[0]}
          <MotionSpan
            style={{
              fontWeight: "bold",
              display: "inline-block",
              margin: "0 0.25rem",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              color: ["#FFD700", "#FFFACD", "#FFD700"], // shimmering gold
              textShadow: [
                "0px 0px 4px #FFD700",
                "0px 0px 10px #FFFACD",
                "0px 0px 6px #FFD700",
              ],
            }}
            transition={{
              duration: 2,
              delay: 1,
              repeat: Infinity, // loop forever
              repeatType: "mirror",
            }}
          >
            {highlight}
          </MotionSpan>
          {parts[1]}
        </MotionText>
      </Box>
    </Box>
  );
};

export default Hero;
