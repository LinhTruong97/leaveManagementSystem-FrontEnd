import React, { useState } from "react";
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { FTextField, FormProvider } from "../components/form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import apiService from "../app/apiService";
import { toast } from "react-toastify";
import AlertMsg from "../components/AlertMsg";

const SetupSchema = Yup.object().shape({
  userName: Yup.string().required("userName is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
  userName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

function SetupAccountPage() {
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(SetupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { userName, email, password } = data;
    try {
      await apiService.put(`/auth/setup/${token}`, {
        userName,
        email,
        password,
      });
      toast.success("Setup Account Successfully", {
        autoClose: 2000,
        onClose: () => {
          navigate("/auth/login");
        },
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  return (
    <Container maxWidth="xs">
      <AlertMsg />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems="center" justifyContent="center">
          <Avatar sx={{ m: 2, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
        </Stack>

        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Already setup account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/auth/login">
              Login
            </Link>
          </Alert>

          <FTextField name="userName" label="User name" />
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            label="Password Confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    edge="end"
                  >
                    {showPasswordConfirmation ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default SetupAccountPage;
