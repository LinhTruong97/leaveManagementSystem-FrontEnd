import React, { useEffect } from "react";
import PendingRequestCard from "../../features/leave/leaveManagement/PendingRequestCard";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
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
  const { isLoading, pendingRequest, employeeRequest } = useSelector(
    (state) => state.employeeLeave
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingLeave());
    dispatch(getEmployeeLeave());
  }, [dispatch]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ mr: 2, mt: 2 }}>
          <Breadcrumbs />
          <Card sx={{ mb: 4, p: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "primary.dark" }}
            >
              Pending requests
            </Typography>
            <Stack sx={{ mr: 4 }}>
              <CustomSlider
                children={
                  pendingRequest &&
                  pendingRequest.map((request) => (
                    <PendingRequestCard key={request._id} request={request} />
                  ))
                }
              />
            </Stack>
          </Card>
          <Card sx={{ mb: 4, p: 3 }}>
            <Box sx={{ my: 3 }}>
              <EventCalendar events={employeeRequest} />
            </Box>
          </Card>
        </Box>
      )}
    </Container>
  );
}

export default LeaveManagementPage;
