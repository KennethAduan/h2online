// import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import NotificationButton from "./Notification/NotificationButton";
import { COLORS } from "../../themes";
export default function Navbar() {
  const AppBar = styled(
    MuiAppBar,
    {}
  )(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: COLORS.primary }}>
        <Toolbar>
          <div>
            <img src="/h2_online_logo.png" className="w-32 h-auto mt-2 " />
          </div>
          {/* <div className="flex justify-around space-y-3">
          

            <h1 className="ml-2 text-lg font-bold">H2 Online</h1>
          </div> */}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 5, my: 2 }}>
            <div>
              <NotificationButton />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
