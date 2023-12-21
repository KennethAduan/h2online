// import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import NotificationButton from "./Notification/NotificationButton";
export default function Navbar() {
  const AppBar = styled(
    MuiAppBar,
    {}
  )(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <div className="flex justify-around space-y-3">
            <div>
              <img src="/h2online.png" className="w-8 h-8 mt-2 " />
            </div>

            <h1 className="ml-2 text-lg font-bold">H2 Online</h1>
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <div>
              <NotificationButton />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
