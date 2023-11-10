import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import TotalCard from "../../components/card/TotalCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SimpleBarChart from "../../components/chart/SimpleBarChart";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "@emotion/react";

function ManagementView() {
  const theme = useTheme();
  const isXxl = useMediaQuery(theme.breakpoints.up("xxl"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const { user } = useAuth();
  const { totalEmployees } = useSelector((state) => state.employee);
  const { totalPendingCount, leaveByMonth, totalApprovedLeave } = useSelector(
    (state) => state.employeeLeave
  );
  const navigate = useNavigate();
  const handleClickEmployee = () => {
    navigate("/employee-management");
  };
  const handleClickLeave = () => {
    navigate("/leave-management");
  };

  const widthBar = isXxl
    ? 1000
    : isXl
    ? 900
    : isLg
    ? 630
    : isMd
    ? 480
    : isSm
    ? 600
    : 270;

  const heightBar = isXxl ? 400 : isMd ? 380 : isSm ? 400 : 300;

  return (
    <Grid container sx={{ my: 2 }} justifyContent="center">
      <Grid item xs={11} sm={10} lg={5} xl={4} sx={{ mb: 2 }}>
        <TotalCard
          title={
            user.role.name === "manager"
              ? "Total Incharge Employees"
              : "Total Employees"
          }
          number={totalEmployees}
          children={
            <Box justifyContent="center">
              <Button
                variant="outlined"
                size="small"
                sx={{
                  mt: 1,
                  width: "30%",
                  borderColor:
                    theme.palette.mode === "dark" ? "white" : "primary.main",
                  color:
                    theme.palette.mode === "dark" ? "white" : "primary.main",
                }}
                onClick={handleClickEmployee}
              >
                Details
              </Button>
            </Box>
          }
        />
      </Grid>
      <Grid item xs={11} sm={10} lg={5} xl={4} sx={{ mb: 2 }}>
        <TotalCard
          title="Total Pending Request"
          number={totalPendingCount}
          children={
            <Box justifyContent="center">
              <Button
                variant="outlined"
                size="small"
                sx={{
                  mt: 1,
                  width: "30%",
                  borderColor:
                    theme.palette.mode === "dark" ? "white" : "primary.main",
                  color:
                    theme.palette.mode === "dark" ? "white" : "primary.main",
                }}
                onClick={handleClickLeave}
              >
                Details
              </Button>
            </Box>
          }
        />
      </Grid>
      <Grid item xs={11} sm={10} lg={5} xl={4} sx={{ mb: 2 }}>
        <TotalCard
          title="Total Approved Leaves"
          number={totalApprovedLeave}
          children={
            <Box justifyContent="center">
              <Button
                variant="outlined"
                size="small"
                sx={{
                  mt: 1,
                  width: "30%",
                  borderColor:
                    theme.palette.mode === "dark" ? "white" : "primary.main",
                  color:
                    theme.palette.mode === "dark" ? "white" : "primary.main",
                }}
                onClick={handleClickLeave}
              >
                Details
              </Button>
            </Box>
          }
        />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          mt: 6,
          mx: 2,
          borderRadius: "10px",
          bgcolor: theme.palette.background.paper,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <SimpleBarChart
          data={leaveByMonth}
          fieldLabel="Total Leaves Taken"
          width={widthBar}
          height={heightBar}
          barColor={theme.palette.primary.main}
        />
      </Grid>
    </Grid>
  );
}

export default ManagementView;
