import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { EMPLOYEE_ROLE } from "../variables/constants";
import styled from "@emotion/styled";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const menuItems1 = [
  { path: "/", text: "Home", icon: <HomeOutlinedIcon /> },
  { path: "/my-profile", text: "My Profile", icon: <PortraitOutlinedIcon /> },
  {
    path: "/employee-management",
    text: "Employee Management",
    icon: <PeopleAltOutlinedIcon />,
  },
  { path: "/my-leaves", text: "My Leaves", icon: <BeachAccessOutlinedIcon /> },
  {
    path: "/leave-management",
    text: "Leave Management",
    icon: <CalendarMonthOutlinedIcon />,
  },
];
const menuItems2 = [
  { path: "/", text: "Home", icon: <HomeOutlinedIcon /> },
  { path: "/my-profile", text: "My Profile", icon: <PortraitOutlinedIcon /> },
  { path: "/my-leaves", text: "My Leaves", icon: <BeachAccessOutlinedIcon /> },
];

const NavButtonItemList = styled(ListItemButton)(() => ({
  borderRadius: "10px",
  paddingLeft: 20,
  mb: 0.5,
  "&.Mui-selected": {
    backgroundColor: "primary.main",
  },
}));

function SideNav() {
  const { user } = useAuth();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const visibleMenuItems = useMemo(() => {
    switch (user?.role.name) {
      case EMPLOYEE_ROLE.MANAGER:
      case EMPLOYEE_ROLE.ADMIN_OFFICE:
        return menuItems1;
      case EMPLOYEE_ROLE.EMPLOYEE:
        return menuItems2;
      default:
        return menuItems1.slice(0, 1);
    }
  }, [user?.role.name]);

  useEffect(() => {
    const selectedItem = visibleMenuItems.findIndex(
      (menuItem) => menuItem.path === `/${location.pathname.split("/")[1]}`
    );
    if (selectedItem !== -1) {
      setSelectedIndex(selectedItem);
    }
  }, [location.pathname, visibleMenuItems]);

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "720px",
        px: 1,
        py: 2,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      {visibleMenuItems.map((menuItem, index) => (
        <NavButtonItemList
          key={menuItem.path}
          component={Link}
          to={menuItem.path}
          selected={selectedIndex === index}
          onClick={() => handleListItemClick(index)}
        >
          <ListItemIcon
            sx={{
              my: "auto",
              minWidth: !menuItem?.icon ? 18 : 36,
              color: "primary.dark",
            }}
          >
            {menuItem.icon}
          </ListItemIcon>
          <ListItemText
            primary={menuItem.text}
            primaryTypographyProps={{ color: "primary.dark", fontWeight: 700 }}
          />
        </NavButtonItemList>
      ))}
    </Box>
  );
}

export default SideNav;
