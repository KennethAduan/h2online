// import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";

// import { Badge } from "@material-tailwind/react";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Profile from "./Profile/Profile";
// import AccountCircle from "@mui/icons-material/AccountCircle";

// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";
// import { useAppDispatch, useAppSelector } from "../../utils/redux/hooks";
// import { UserInfoRedux } from "../../utils/redux/slice/userSlice";
// import { NotificationBtn } from "./Notification/NotificationBtn";

export default function Navbar() {
  //   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
  //     React.useState<null | HTMLElement>(null);

  //   const isMenuOpen = Boolean(anchorEl);
  //   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //   //   Redux
  //   const dispatch = useAppDispatch();
  //   const { isOpenNav } = useAppSelector((state) => state.user);

  //   const handleDrawerOpen = () => {
  //     dispatch(
  //       UserInfoRedux({
  //         isOpenNav: !isOpenNav,
  //       })
  //     );
  //   };

  //   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  //   const handleMobileMenuClose = () => {
  //     setMobileMoreAnchorEl(null);
  //   };

  //   const handleMenuClose = () => {
  //     setAnchorEl(null);
  //     handleMobileMenuClose();
  //   };

  //   const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //     setMobileMoreAnchorEl(event.currentTarget);
  //   };

  //   const menuId = "primary-search-account-menu";
  //   const renderMenu = (
  //     <Menu
  //       anchorEl={anchorEl}
  //       anchorOrigin={{
  //         vertical: "top",
  //         horizontal: "right",
  //       }}
  //       id={menuId}
  //       keepMounted
  //       transformOrigin={{
  //         vertical: "top",
  //         horizontal: "right",
  //       }}
  //       open={isMenuOpen}
  //       onClose={handleMenuClose}
  //     >
  //       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //     </Menu>
  //   );

  //   const mobileMenuId = "primary-search-account-menu-mobile";
  //   const renderMobileMenu = (
  //     <Menu
  //       anchorEl={mobileMoreAnchorEl}
  //       anchorOrigin={{
  //         vertical: "top",
  //         horizontal: "right",
  //       }}
  //       id={mobileMenuId}
  //       keepMounted
  //       transformOrigin={{
  //         vertical: "top",
  //         horizontal: "right",
  //       }}
  //       open={isMobileMenuOpen}
  //       onClose={handleMobileMenuClose}
  //     >
  //       <MenuItem>
  //         <IconButton
  //           size="large"
  //           aria-label="show 17 new notifications"
  //           color="inherit"
  //         >
  //           <Badge content="5" withBorder>
  //             <NotificationsIcon />
  //           </Badge>
  //         </IconButton>
  //         <p>Notifications</p>
  //       </MenuItem>
  //       <MenuItem onClick={handleProfileMenuOpen}>
  //         <IconButton
  //           size="large"
  //           aria-label="account of current user"
  //           aria-controls="primary-search-account-menu"
  //           aria-haspopup="true"
  //           color="inherit"
  //         >
  //           <AccountCircle />
  //         </IconButton>
  //         <p>Profile</p>
  //       </MenuItem>
  //     </Menu>
  //   );
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
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon sx={{ height: 30, width: 30 }} />
          </IconButton> */}
          <div className="flex justify-around space-y-3">
            <div>
              <img src="/h2online.png" className="w-8 h-8 mt-2 " />
            </div>

            <h1 className="ml-2 text-lg font-bold">H2 Online</h1>
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <div className="px-2 py-2">
              <NotificationBtn />
            </div> */}

            {/* <div className="px-2 py-2">
              <Profile />
            </div> */}
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu}
      {renderMenu} */}
    </Box>
  );
}
