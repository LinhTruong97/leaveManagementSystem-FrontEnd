import { Box, Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import Breadcrumbs from "../../components/navigation/Breadcrumbs";

import { useEffect } from "react";
import {
  getMyLeaveBalance,
  getSingleLeave,
} from "../../features/leave/myLeaves/myLeaveSlice";
import UpdateLeaveForm from "../../features/leave/myLeaves/UpdateLeaveForm";
import { useParams } from "react-router-dom";
import CategoryBalancePieChart from "../../features/leave/myLeaves/leaveBalance/CategoryBalancePieChart";

function UpdateLeavePage() {
  const params = useParams();
  const requestId = params.requestId;

  const { isLoading, leaveBalance, selectedRequest } = useSelector(
    (state) => state.myLeave
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyLeaveBalance());
  }, [dispatch]);

  useEffect(() => {
    if (requestId) {
      dispatch(getSingleLeave(requestId));
    }
  }, [dispatch, requestId]);

  return (
    <Container>
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
              {selectedRequest && (
                <UpdateLeaveForm selectedRequest={selectedRequest} />
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default UpdateLeavePage;
