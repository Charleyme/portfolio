import { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down" | "scale";
  delay?: number;
  duration?: number;
  stagger?: boolean; // 👈 new
}

const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  stagger = false,
}: RevealProps) => {
  const variants: Record<string, any> = {
    up: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  };

  const variant = variants[direction];

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      transition={{
        duration,
        delay,
        ease: "easeOut",
        when: stagger ? "beforeChildren" : undefined,
        staggerChildren: stagger ? 0.15 : undefined, // 👈 smooth sequence
      }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        display: "inline-block",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
