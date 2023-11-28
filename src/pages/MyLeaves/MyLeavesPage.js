import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  TablePagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";

function MyLeavesPage() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState({ status: "", category: "" });
  const [openCardModal, setOpenCardModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

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

  const navigate = useNavigate();

  const handleFilterToggle = () => {
    setOpenFilter(!openFilter);
  };

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
        <Box sx={{ my: 2, mr: 1 }}>
          <Breadcrumbs />
          <Grid
            container
            spacing={2}
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

            <Grid item xs={12}>
              <Card>
                <Stack direction="row" justifyContent="space-between">
                  <Box
                    sx={{
                      m: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate("/my-leaves/apply-leave");
                      }}
                      sx={{ minWidth: "25%" }}
                    >
                      + Apply New Leave
                    </Button>
                  </Box>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="filter"
                    sx={{ mr: 2 }}
                    onClick={handleFilterToggle}
                  >
                    <FilterListIcon />
                  </IconButton>
                </Stack>
                {openFilter && <RequestFilter setFilter={setFilter} />}

                <Box
                  sx={{
                    overflowX: isXl ? "visible" : "scroll",
                  }}
                >
                  <RequestTable
                    requests={currentPageLeaveRequest}
                    handleOpenModal={handleOpenModal}
                  />
                </Box>

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
            </Grid>

            {openCardModal && (
              <RequestDetailModal onClose={() => setOpenCardModal(false)} />
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default MyLeavesPage;
