import { Drawer, Grid, alpha, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import MainHeader from "./MainHeader";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import SideNav from "./SideNav";
import { useTheme } from "@emotion/react";

function MainLayout() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleSideNavToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <MainHeader onSideNavToggle={handleSideNavToggle} />
      <AlertMsg />
      <Grid
        container
        spacing={5}
        sx={{
          display: "flex",
          mt: 0,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
        }}
      >
        {isMd && (
          <Grid item md={4} xl={3} mt="-40px">
            <SideNav />
          </Grid>
        )}

        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={handleClose}
          variant="temporary"
        >
          <SideNav handleClose={handleClose} />
        </Drawer>

        <Grid item xs={12} md={8} xl={9} mt="-40px">
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}

export default MainLayout;
