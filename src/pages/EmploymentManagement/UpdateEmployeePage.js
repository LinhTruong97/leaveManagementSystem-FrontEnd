import { Box, Card, Container } from "@mui/material";
import React, { useEffect } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/navigation/Breadcrumbs";
import {
  getReportToEmployeeList,
  getSingleEmployee,
} from "../../features/employee/employeeSlice";
import { useParams } from "react-router-dom";
import UpdateEmployeeForm from "../../features/employee/UpdateEmployeeForm";

function UpdateEmployeePage() {
  const params = useParams();
  const employeeId = params.employeeId;

  const {
    isLoading,
    selectedEmployee,
    reportToEmployeeList,
    selectedReportToEmployee,
  } = useSelector((state) => state.employee);

  const dispatch = useDispatch();

  useEffect(() => {
    if (employeeId) {
      dispatch(getSingleEmployee(employeeId));
    }
  }, [dispatch, employeeId]);

  useEffect(() => {
    dispatch(getReportToEmployeeList());
  }, [dispatch]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ mr: 2, mt: 2 }}>
          <Breadcrumbs />
          <Card sx={{ width: "60%", m: "2rem auto", p: 4 }}>
            {selectedEmployee && (
              <UpdateEmployeeForm
                selectedEmployee={selectedEmployee}
                reportToEmployeeList={reportToEmployeeList}
                selectedReportToEmployee={selectedReportToEmployee}
              />
            )}
          </Card>
        </Box>
      )}
    </Container>
  );
}

export default UpdateEmployeePage;
