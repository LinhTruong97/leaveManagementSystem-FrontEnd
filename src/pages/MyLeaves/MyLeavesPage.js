import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Container, TablePagination } from "@mui/material";
import {
  clearSelectedLeave,
  getMyLeaveBalance,
  getMyLeaveRequestList,
} from "../../features/leave/myLeaves/myLeaveSlice";
import Breadcrumbs from "../../components/navigation/Breadcrumbs";
import LoadingScreen from "../../components/LoadingScreen";
import CategoryBalancePieChart from "../../features/leave/myLeaves/leaveBalance/CategoryBalancePieChart";
import RequestTable from "../../features/leave/myLeaves/requestTable/RequestTable";
import RequestFilter from "../../features/leave/myLeaves/requestTable/RequestFilter";
import RequestDetailModal from "../../features/leave/myLeaves/RequestDetailModal";

function MyLeavesPage() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState({ status: "", category: "" });
  const [openCardModal, setOpenCardModal] = useState(false);

  const dispatch = useDispatch();

  const { isLoading, leaveBalance, currentPageLeaveRequest, totalRequests } =
    useSelector((state) => state.myLeave);

  useEffect(() => {
    dispatch(getMyLeaveBalance());
    dispatch(clearSelectedLeave());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMyLeaveRequestList({ page: page + 1, limit, filter }));
  }, [page, limit, filter, dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  const handleOpenModal = () => {
    setOpenCardModal(true);
  };

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

          <Card sx={{ pt: 2, my: 2 }}>
            <RequestFilter setFilter={setFilter} />
            <RequestTable
              requests={currentPageLeaveRequest}
              handleOpenModal={handleOpenModal}
            />
            <TablePagination
              page={page}
              component="div"
              count={totalRequests || 0}
              rowsPerPage={limit}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>

          {openCardModal && (
            <RequestDetailModal onClose={() => setOpenCardModal(false)} />
          )}
        </Box>
      )}
    </Container>
  );
}

export default MyLeavesPage;
