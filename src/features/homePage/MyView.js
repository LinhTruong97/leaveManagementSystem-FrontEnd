import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TotalCard from "../../components/card/TotalCard";
import EventCalendar from "../../components/calendar/EventCalendar";
import { useSelector } from "react-redux";

function MyView() {
  const { totalUsedSum, totalRemainingSum, fullLeavesrequest, myPendingCount } =
    useSelector((state) => state.myLeave);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

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
        <EventCalendar
          events={fullLeavesrequest}
          type="userView"
          width="80%"
          height={isXs ? 400 : 600}
          fontSize={isXs ? 13 : 18}
        />
      </Grid>
    </Grid>
  );
}

export default MyView;
