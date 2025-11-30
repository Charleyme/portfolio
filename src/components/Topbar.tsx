import {
  Flex,
  IconButton,
  Text,
  Avatar,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const Topbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      h="70px"
      align="center"
      justify="space-between"
      px={16}
      bg={useColorModeValue("white", "gray.900")}
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Text fontSize="xl" fontWeight="bold">
        Admin Dashboard
      </Text>

      <Flex align="center" gap={4}>
        <IconButton
          aria-label="Toggle color mode"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
        />
        <Avatar name="Admin" size="sm" />
      </Flex>
    </Flex>
  );
};

export default Topbar;
