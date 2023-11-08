import { Box, Container, Typography } from "@mui/material";
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
          <ApplyLeaveForm />
        </Box>
      )}
    </Container>
  );
}

export default ApplyLeavePage;
