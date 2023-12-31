import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {
  FAutocomplete,
  FBasicDatePicker,
  FSelect,
  FTextField,
  FormProvider,
} from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EMPLOYEE_ROLE_OPTIONS } from "../../variables/constants";
import { toPascalCase } from "../../utils/stringFormat";
import {
  createEmployee,
  getReportToEmployeeList,
} from "../../features/employee/employeeSlice";
import * as yup from "yup";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/navigation/Breadcrumbs";

const employeeSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().notOneOf([""], "Role is required"),
  birthday: yup.date().required("Birthday is required"),
});

function AddEmployeePage() {
  const { isLoading, reportToEmployeeList } = useSelector(
    (state) => state.employee
  );
  const defaultValues = {
    fullName: "",
    email: "",
    role: "",
    birthday: dayjs(new Date()),
  };
  const methods = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReportToEmployeeList());
  }, [dispatch]);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(createEmployee(data));
    navigate("/employee-management");
  };

  const handleClearClick = () => {
    reset();
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
        <Box sx={{ my: 2 }}>
          <Breadcrumbs />
          <Grid container justifyContent="center">
            <Grid item xs={12} lg={10} xl={8}>
              <Card sx={{ width: "100%", m: "2rem auto", p: 4 }}>
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Stack spacing={4}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, textAlign: "center" }}
                      >
                        User Info
                      </Typography>
                      <Typography sx={{ textAlign: "center" }}>
                        Mandatory informations
                      </Typography>
                    </Box>
                    <FTextField
                      margin="normal"
                      required
                      id="fullName"
                      label="Full Name"
                      name="fullName"
                    />
                    <FTextField
                      margin="normal"
                      required
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                      <FSelect
                        name="role"
                        defaultValue=""
                        required
                        sx={{
                          width: "100%",
                          alignSelf: "center",
                        }}
                        label="Role"
                      >
                        <option value="" />
                        {EMPLOYEE_ROLE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {toPascalCase(option)}
                          </option>
                        ))}
                      </FSelect>
                      <FAutocomplete
                        name="reportTo"
                        required
                        style={{ width: "100%" }}
                        options={reportToEmployeeList}
                        label="Report To Employee*"
                      />
                    </Stack>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <FBasicDatePicker label="Birthday*" name="birthday" />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 3,
                        mt: 3,
                      }}
                    >
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting || isLoading}
                      >
                        Submit
                      </LoadingButton>
                      <Button variant="contained" onClick={handleClearClick}>
                        Clear
                      </Button>
                    </Box>
                  </Stack>
                </FormProvider>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default AddEmployeePage;
