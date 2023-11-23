import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Avatar,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../theme";
import Notification from "../components/Notification";
import { useDispatch } from "react-redux";
import { resetNotificationState } from "../features/notification/notificationSlice";
import { resetMyProfileState } from "../features/myProfile/userSlice";
import { resetMyLeaveState } from "../features/leave/myLeaves/myLeaveSlice";
import { resetEmployeeState } from "../features/employee/employeeSlice";
import { resetEmployeeLeaveState } from "../features/leave/leaveManagement/employeeLeaveSlice";

function MainHeader({ onSideNavToggle }) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const colorMode = useContext(ColorModeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        dispatch(resetMyProfileState());
        dispatch(resetMyLeaveState());
        dispatch(resetEmployeeState());
        dispatch(resetEmployeeLeaveState());
        dispatch(resetNotificationState());
        navigate("/auth/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id="menu-appbar"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.userName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {!isMd && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { md: "none" } }}
              onClick={onSideNavToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, fontWeight: 600 }}
          >
            Leave Management System
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "light" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>

          <Notification />

          <Box>
            <Avatar
              onClick={handleProfileMenuOpen}
              src={user.avatarUrl}
              alt={user.userName}
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default MainHeader;
