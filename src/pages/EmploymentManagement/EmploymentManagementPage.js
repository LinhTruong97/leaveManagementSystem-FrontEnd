import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Tab,
  TablePagination,
  Tabs,
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

function EmploymentManagementPage() {
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState({ fullName: "", status: "", role: "" });
  const [openCardModal, setOpenCardModal] = useState(false);
  const [selectedStatusTab, setSelectedStatusTab] = useState(0);

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

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ mr: 2, mt: 2 }}>
          <Breadcrumbs />
          <Card sx={{ mt: 3, pt: 2 }}>
            <Stack direction="row" justifyContent="space-between" m={2}>
              <Tabs
                value={selectedStatusTab}
                onChange={handleStatusTabChange}
                sx={{ ml: 2 }}
              >
                <Tab label="All" key="All" />
                {EMPLOYEE_STATUS_OPTIONS.map((status, index) => (
                  <Tab label={status} key={status} />
                ))}
              </Tabs>
              {user && user.role.name === "admin_office" && (
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/employee-management/add-employee");
                  }}
                >
                  + Add new employee
                </Button>
              )}
            </Stack>

            <EmployeeFilter filter={filter} setFilter={setFilter} />

            <EmployeeTable
              employeeList={currentPageEmployeeList}
              handleOpenModal={handleOpenModal}
              startNo={page * limit + 1}
            />
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
          {openCardModal && (
            <EmployeeInfoModal onClose={() => setOpenCardModal(false)} />
          )}
        </Box>
      )}
    </Container>
  );
}

export default EmploymentManagementPage;
