import { Grid, alpha } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import SideNav from "./SideNav";

function MainLayout() {
  return (
    <>
      <MainHeader />
      <AlertMsg />
      <Grid
        container
        spacing={5}
        sx={{
          display: "flex",
          mt: "0",
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
        }}
      >
        <Grid item xs={3} mt="-40px">
          <SideNav />
        </Grid>
        <Grid xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}

export default MainLayout;
