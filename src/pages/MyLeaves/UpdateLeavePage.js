import { Box, Container } from "@mui/material";
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
        <Box sx={{ mr: 2, mt: 2 }}>
          <Breadcrumbs />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              rowGap: 4,
            }}
          >
            {leaveBalance?.map((item) => (
              <CategoryBalancePieChart
                key={item._id}
                item={item}
                title={item.leaveCategory.name}
                usedValue={item.totalUsed}
                remainingValue={item.totalRemaining}
              />
            ))}
          </Box>
          <Box sx={{ height: 50 }} />
          {selectedRequest && (
            <UpdateLeaveForm selectedRequest={selectedRequest} />
          )}
        </Box>
      )}
    </Container>
  );
}

export default UpdateLeavePage;
