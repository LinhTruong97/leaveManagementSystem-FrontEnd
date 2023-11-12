import React, { useEffect } from "react";
import PendingRequestCard from "../../features/leave/leaveManagement/PendingRequestCard";
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Breadcrumbs from "../../components/navigation/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import {
  getEmployeeLeave,
  getPendingLeave,
} from "../../features/leave/leaveManagement/employeeLeaveSlice";
import EventCalendar from "../../components/calendar/EventCalendar";
import CustomSlider from "../../components/slider/CustomSlider";

function LeaveManagementPage() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const { isLoading, pendingRequest, employeeRequest } = useSelector(
    (state) => state.employeeLeave
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingLeave());
    dispatch(getEmployeeLeave());
  }, [dispatch]);

  const pendingCardMaxWith = isXl
    ? "250px"
    : isLg
    ? "270px"
    : isSm
    ? "300px"
    : "170px";

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ my: 2 }}>
          <Breadcrumbs />
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card sx={{ py: 4, px: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color:
                      theme.palette.mode === "light"
                        ? "primary.dark"
                        : "primary.lighter",
                    my: 2,
                  }}
                  textAlign="center"
                >
                  PENDING REQUEST
                </Typography>
                <CustomSlider
                  children={
                    pendingRequest &&
                    pendingRequest.map((request) => (
                      <PendingRequestCard
                        key={request._id}
                        request={request}
                        sx={{
                          maxWidth: pendingCardMaxWith,
                          mx: "auto",
                          border:
                            theme.palette.mode === "light"
                              ? "1px solid #5E35B1"
                              : "2px solid white",
                        }}
                      />
                    ))
                  }
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ mb: 4, p: 3 }}>
                <Box
                  sx={{
                    overflowX: "auto",
                  }}
                >
                  <EventCalendar
                    events={employeeRequest}
                    height={600}
                    fontSize={isLg ? 17 : 14}
                    minWidth={isLg ? 500 : 400}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default LeaveManagementPage;
