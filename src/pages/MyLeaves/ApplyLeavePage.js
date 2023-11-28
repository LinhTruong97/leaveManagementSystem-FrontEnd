import { Box, Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import Breadcrumbs from "../../components/navigation/Breadcrumbs";

import ApplyLeaveForm from "../../features/leave/myLeaves/ApplyLeaveForm";
import { useEffect } from "react";
import { getMyLeaveBalance } from "../../features/leave/myLeaves/myLeaveSlice";
import CategoryBalancePieChart from "../../features/leave/myLeaves/leaveBalance/CategoryBalancePieChart";

function ApplyLeavePage() {
  const { isLoading, leaveBalance } = useSelector((state) => state.myLeave);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyLeaveBalance());
  }, [dispatch]);

  return (
    <Container
      sx={{
        position: "relative",
        minHeight: "600px",
      }}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ my: 2 }}>
          <Breadcrumbs />
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {leaveBalance?.map((item) => (
              <Grid item xs={13} sm={6} md={8} lg={6} xl={4}>
                <CategoryBalancePieChart
                  key={item._id}
                  item={item}
                  title={item.leaveCategory.name}
                  usedValue={item.totalUsed}
                  remainingValue={item.totalRemaining}
                />
              </Grid>
            ))}
            <Grid item xs={12} lg={10} xl={7}>
              <ApplyLeaveForm />
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default ApplyLeavePage;
