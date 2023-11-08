import { Grid, Stack } from "@mui/material";
import React from "react";
import TotalCard from "../../components/card/TotalCard";
import EventCalendar from "../../components/calendar/EventCalendar";
import { useSelector } from "react-redux";

function MyView() {
  const { totalUsedSum, totalRemainingSum, fullLeavesrequest, myPendingCount } =
    useSelector((state) => state.myLeave);
  return (
    <Grid container sx={{ mx: 2, my: 4 }}>
      <Grid xs={4}>
        <TotalCard
          title="Total Applied Days"
          number={totalUsedSum}
          sx={{
            p: 2,
            m: 2,
            textAlign: "center",
            color: "primary.darker",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        />
      </Grid>

      <Grid xs={4}>
        <TotalCard
          title="Total Remaining Days"
          number={totalRemainingSum}
          sx={{
            p: 2,
            m: 2,

            textAlign: "center",
            color: "primary.darker",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        />
      </Grid>
      <Grid xs={4}>
        <TotalCard
          title="Total Pending Request"
          number={myPendingCount}
          sx={{
            p: 2,
            m: 2,

            textAlign: "center",
            color: "primary.darker",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        />
      </Grid>

      <Grid
        xs={12}
        sx={{
          my: 4,
          borderRadius: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          p: 3,
        }}
      >
        <EventCalendar events={fullLeavesrequest} type="userView" width="80%" />
      </Grid>
    </Grid>
  );
}

export default MyView;
