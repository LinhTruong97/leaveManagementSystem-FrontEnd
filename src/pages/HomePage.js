import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  getFullMyLeaveRequestList,
  getMyLeaveBalance,
} from "../features/leave/myLeaves/myLeaveSlice";
import LoadingScreen from "../components/LoadingScreen";
import MyView from "../features/homePage/MyView";
import ManagementView from "../features/homePage/ManagementView";
import { getEmployeeList } from "../features/employee/employeeSlice";
import {
  getLeaveByMonth,
  getPendingLeave,
} from "../features/leave/leaveManagement/employeeLeaveSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

function HomePage() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("myView");
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const { isLoading } = useSelector((state) => state.myLeave);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyLeaveBalance());
    dispatch(getFullMyLeaveRequestList());
    if (user.role.name === "manager" || user.role.name === "admin_office") {
      dispatch(getEmployeeList({ page: 1 }));
      dispatch(getPendingLeave());
      dispatch(getLeaveByMonth(2023));
    }
  }, [dispatch, user.role.name]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box
          sx={{
            my: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="My View" value="myView" sx={{ p: 1 }} />
              {(user.role.name === "manager" ||
                user.role.name === "admin_office") && (
                <Tab
                  label="Management View"
                  value="managementView"
                  sx={{ p: 1 }}
                />
              )}
            </Tabs>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/my-leaves/apply-leave");
              }}
              sx={{ height: isLg ? 50 : 40 }}
            >
              {isLg ? "+ Apply New Leave" : "+ New Leave"}
            </Button>
          </Stack>
          {currentTab === "myView" && <MyView />}
          {currentTab === "managementView" && <ManagementView />}
        </Box>
      )}
    </Container>
  );
}

export default HomePage;
