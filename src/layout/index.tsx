import { Navbar, Sidebar } from "../components";
import { Box } from "@mui/material";
import { ReactNode } from "react";
interface DrawerNavLayoutProps {
  children: ReactNode;
}
export const DrawerAndNavLayout = ({ children }: DrawerNavLayoutProps) => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 4, pt: 12 }}>{children}</Box>
      </Box>
    </>
  );
};
