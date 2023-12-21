import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Swal from "sweetalert2";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import AllInboxIcon from "@mui/icons-material/AllInbox";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAppSelector, useAppDispatch } from "../../utils/redux/hooks";
import AssessmentIcon from "@mui/icons-material/Assessment";
// import { COLORS } from "../../themes";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUserRedux } from "../../utils/redux/slice/userSlice";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MonitorIcon from "@mui/icons-material/Monitor";
const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  // Set the background color here

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      // Set the background color for the paper when the drawer is open
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      // Set the background color for the paper when the drawer is closed
    },
  }),
}));

export default function Sidebar() {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { isOpenNav } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={isOpenNav}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div>
          <img src="/h2o-logo.png" className="w-auto h-auto p-2 mt-2" />
        </div>
        {/* POS */}

        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/pos");
              document.title = "H2 Online | POS";
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isOpenNav ? "initial" : "center",
                px: 2.5,
              }}
            >
              <Tooltip title="POS" placement="right">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpenNav ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MonitorIcon
                    color={isActive("/pos") ? "primary" : "inherit"}
                  />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={"POS"}
                sx={{ opacity: isOpenNav ? 1 : 0, color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* sales */}
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/sales");
              document.title = "H2 Online | sales";
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isOpenNav ? "initial" : "center",
                px: 2.5,
              }}
            >
              <Tooltip title="sales" placement="right">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpenNav ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AssessmentIcon
                    color={isActive("/sales") ? "primary" : "inherit"}
                  />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={"sales"}
                sx={{ opacity: isOpenNav ? 1 : 0, color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Inventory */}
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/inventory");
              document.title = "H2 Online | Inventory";
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isOpenNav ? "initial" : "center",
                px: 2.5,
              }}
            >
              <Tooltip title="Inventory" placement="right">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpenNav ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ChecklistIcon
                    color={isActive("/inventory") ? "primary" : "inherit"}
                  />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={"Sales"}
                sx={{ opacity: isOpenNav ? 1 : 0, color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Logout */}
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "Logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(logoutUserRedux());
                  localStorage.clear();
                  navigate("/");
                  // Swal.fire({
                  //   title: "!",
                  //   text: "Your file has been deleted.",
                  //   icon: "success",
                  // });
                }
              });
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isOpenNav ? "initial" : "center",
                px: 2.5,
              }}
            >
              <Tooltip title="Logout" placement="right">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpenNav ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon
                    color={isActive("/logout") ? "primary" : "inherit"}
                  />
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={"Customers"}
                sx={{ opacity: isOpenNav ? 1 : 0, color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
