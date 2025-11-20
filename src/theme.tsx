import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",      // 👈 Force light mode
    useSystemColorMode: false,      // 👈 Ignore system preference
  },
});

export default theme;
