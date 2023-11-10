import { Box, Card, Container, Grid } from "@mui/material";
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
        <Box sx={{ my: 2 }}>
          <Breadcrumbs />
          <Grid container justifyContent="center">
            <Grid item xs={12} lg={10} xl={8}>
              <Card sx={{ width: "100%", m: "2rem auto", p: 4 }}>
                {selectedEmployee && (
                  <UpdateEmployeeForm
                    selectedEmployee={selectedEmployee}
                    reportToEmployeeList={reportToEmployeeList}
                    selectedReportToEmployee={selectedReportToEmployee}
                  />
                )}
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default UpdateEmployeePage;
