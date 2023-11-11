import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TotalCard from "../../components/card/TotalCard";
import EventCalendar from "../../components/calendar/EventCalendar";
import { useSelector } from "react-redux";

function MyView() {
  const { totalUsedSum, totalRemainingSum, fullLeavesrequest, myPendingCount } =
    useSelector((state) => state.myLeave);

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid container sx={{ my: 2 }} justifyContent="center">
      <Grid item xs={11} sm={10} lg={5} xl={4} sx={{ mb: 2 }}>
        <TotalCard title="Total Applied Days" number={totalUsedSum} />
      </Grid>

      <Grid item xs={11} sm={10} lg={5} xl={4} sx={{ mb: 2 }}>
        <TotalCard title="Total Remaining Days" number={totalRemainingSum} />
      </Grid>

      <Grid item xs={11} sm={10} lg={5} xl={4} sx={{ mb: 2 }}>
        <TotalCard title="Total Pending Request" number={myPendingCount} />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          my: 2,
          mx: 2,
          borderRadius: "10px",
          bgcolor: theme.palette.background.paper,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          p: 3,
        }}
      >
        <Box
          sx={{
            overflowX: "auto",
          }}
        >
          <EventCalendar
            events={fullLeavesrequest}
            type="userView"
            height={600}
            fontSize={isLg ? 17 : 14}
            minWidth={isLg ? 500 : 400}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default MyView;
