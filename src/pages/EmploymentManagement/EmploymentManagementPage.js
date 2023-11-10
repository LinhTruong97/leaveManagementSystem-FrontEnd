import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  Tab,
  TablePagination,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/navigation/Breadcrumbs";
import {
  clearSelectedEmployee,
  getEmployeeList,
} from "../../features/employee/employeeSlice";
import EmployeeTable from "../../features/employee/employeeTable/EmployeeTable";
import { EMPLOYEE_STATUS_OPTIONS } from "../../variables/constants";
import EmployeeInfoModal from "../../features/employee/EmployeeInfoModal";
import { useNavigate } from "react-router-dom";
import EmployeeFilter from "../../features/employee/employeeTable/EmployeeFilter";
import useAuth from "../../hooks/useAuth";
import FilterListIcon from "@mui/icons-material/FilterList";

function EmploymentManagementPage() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState({ fullName: "", status: "", role: "" });
  const [openCardModal, setOpenCardModal] = useState(false);
  const [selectedStatusTab, setSelectedStatusTab] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);

  const { isLoading, currentPageEmployeeList, totalEmployees } = useSelector(
    (state) => state.employee
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeList({ page: page + 1, limit, filter }));
  }, [page, limit, filter, dispatch]);

  useEffect(() => {
    dispatch(clearSelectedEmployee());
  }, [dispatch]);

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
  const handleStatusTabChange = (event, newValue) => {
    setSelectedStatusTab(newValue);
    if (newValue === 0) {
      setFilter({ ...filter, status: "" });
    } else {
      const selectedStatus = EMPLOYEE_STATUS_OPTIONS[newValue - 1];
      setFilter({ ...filter, status: selectedStatus });
    }
  };

  const handleFilterToggle = () => {
    setOpenFilter(!openFilter);
  };
  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ mt: 2 }}>
          <Breadcrumbs />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <Stack direction="row" justifyContent="space-between">
                  {user && user.role.name === "admin_office" && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        m: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate("/employee-management/add-employee");
                        }}
                        sx={{ minWidth: "25%" }}
                      >
                        + Add new employee
                      </Button>
                    </Box>
                  )}
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
                {isSm && (
                  <Stack
                    direction="row"
                    mx={2}
                    mb={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Tabs
                      value={selectedStatusTab}
                      onChange={handleStatusTabChange}
                    >
                      <Tab label="All" key="All" />
                      {EMPLOYEE_STATUS_OPTIONS.map((status, index) => (
                        <Tab label={status} key={status} />
                      ))}
                    </Tabs>
                  </Stack>
                )}

                {openFilter && (
                  <EmployeeFilter filter={filter} setFilter={setFilter} />
                )}

                <Box
                  sx={{
                    overflowX: isXl ? "visible" : "scroll",
                    border: "1px solid #ddd",
                  }}
                >
                  <EmployeeTable
                    employeeList={currentPageEmployeeList}
                    handleOpenModal={handleOpenModal}
                    startNo={page * limit + 1}
                  />
                </Box>

                <TablePagination
                  page={page}
                  component="div"
                  count={totalEmployees || 0}
                  rowsPerPage={limit}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Grid>

            {openCardModal && (
              <EmployeeInfoModal onClose={() => setOpenCardModal(false)} />
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default EmploymentManagementPage;
