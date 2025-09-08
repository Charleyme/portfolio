import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface RevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down" | "scale";
}

const MotionBox = motion.div;

const Reveal = ({ children, direction = "up" }: RevealProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // Default animation states
  let initial: any = { opacity: 0 };
  let animate: any = { opacity: 1 };

  // Add direction-specific transforms
  if (direction === "left") {
    initial.x = -100;
    animate.x = 0;
  }
  if (direction === "right") {
    initial.x = 100;
    animate.x = 0;
  }
  if (direction === "up") {
    initial.y = 50;
    animate.y = 0;
  }
  if (direction === "down") {
    initial.y = -50;
    animate.y = 0;
  }
  if (direction === "scale") {
    initial.scale = 0.8;
    animate.scale = 1;
  }

  return (
    <MotionBox
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ width: "100%", height: "100%" }} // ✅ ensures child fills properly
    >
      {children}
    </MotionBox>
  );
};

export default Reveal;

