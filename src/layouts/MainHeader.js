import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { Avatar, Divider } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
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
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, fontWeight: 600 }}
          >
            Leave Management System
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
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
