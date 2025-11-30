import { Box, Show } from "@chakra-ui/react";
import Sidebar from "./SideBar"
import Topbar from "./Topbar";
import AdminNavbar from "./AdminNavbar";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Box display="flex">
      <AdminNavbar />
      <Box
        ml={{ md: "260px" }} // leave space for desktop sidebar
        w="full"
        pt={{ base: "70px", md: 6 }} // avoid overlapping mobile topbar
        p={6}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
