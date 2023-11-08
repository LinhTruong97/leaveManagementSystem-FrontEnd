import {
  Box,
  Button,
  Container,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  FAutocomplete,
  FBasicDatePicker,
  FRadioGroup,
  FSelect,
  FTextField,
  FormProvider,
} from "../../components/form";
import { EMPLOYEE_ROLE_OPTIONS } from "../../variables/constants";
import { toPascalCase } from "../../utils/stringFormat";
import LoadingScreen from "../../components/LoadingScreen";
import { updateEmployee } from "./employeeSlice";

const employeeSchema = yup.object().shape({
  userName: yup.string().required("User Name is required"),
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().notOneOf([""], "Role is required"),
  birthday: yup.date().required("Birthday is required"),
  gender: yup.string().required("Gender is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
});

function UpdateEmployeeForm({
  selectedEmployee,
  reportToEmployeeList,
  selectedReportToEmployee,
}) {
  const { isLoading } = useSelector((state) => state.employee);

  const defaultValues = {
    userName: selectedEmployee?.userName,
    fullName: selectedEmployee?.fullName,
    email: selectedEmployee?.email,
    role: selectedEmployee?.role.name,
    reportTo: selectedEmployee?.reportTo,
    birthday: selectedEmployee?.birthday || dayjs(new Date()),
    gender: selectedEmployee?.gender,
    phone: selectedEmployee?.phone,
    address: selectedEmployee?.address,
  };
  const methods = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    dispatch(
      updateEmployee({ employeeId: selectedEmployee?._id, ...data })
    ).then(() => reset());
    navigate("/employee-management");
  };

  const handleCancelClick = () => {
    reset();
    navigate("/employee-management");
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, textAlign: "center" }}
              >
                USER PROFILE
              </Typography>
            </Box>
            <FTextField
              margin="normal"
              required
              id="userName"
              label="User Name"
              name="userName"
            />
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FSelect
                name="role"
                defaultValue=""
                sx={{
                  width: "100%",
                  maxWidth: "150px",
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
                style={{ width: "60%" }}
                options={reportToEmployeeList}
                label="Report To Employee"
                defaultValue={selectedReportToEmployee}
              />
            </Box>

            <FBasicDatePicker label="Birthday" name="birthday" />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              spacing={2}
            >
              <InputLabel>Gender</InputLabel>
              <FRadioGroup
                name="gender"
                options={["Male", "Female", "Other"]}
              />
            </Stack>

            <FTextField
              margin="normal"
              required
              id="phone"
              label="Phone"
              name="phone"
            />
            <FTextField
              margin="normal"
              required
              id="address"
              label="Address"
              name="address"
            />
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
                Save All
              </LoadingButton>
              <Button variant="contained" onClick={handleCancelClick}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </FormProvider>
      )}
    </Container>
  );
}

export default UpdateEmployeeForm;
