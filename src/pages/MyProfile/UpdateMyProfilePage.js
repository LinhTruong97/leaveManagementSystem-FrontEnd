import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Container,
  FormLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen";
import Breadcrumbs from "../../components/navigation/Breadcrumbs";
import {
  FBasicDatePicker,
  FRadioGroup,
  FTextField,
  FUploadAvatar,
  FormProvider,
} from "../../components/form";
import { fSize } from "../../utils/numberFormat";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  getCurrentUser,
  updateUserProfile,
} from "../../features/myProfile/userSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const yupSchema = yup.object().shape({
  userName: yup.string().required("User Name is required"),
  birthday: yup.date().required("Birthday is required"),
});

function UpdateMyProfilePage() {
  const { isLoading, updatedProfile } = useSelector((state) => state.myProfile);
  const { user } = useAuth();

  const defaultValues = {
    userName: updatedProfile?.userName || user.userName,
    gender: updatedProfile?.gender || user.gender,
    birthday: updatedProfile?.birthday || user.birthday,
    phone: updatedProfile?.phone || user.phone,
    address: updatedProfile?.address || user.address,
    avatarUrl: updatedProfile?.avatarUrl || user.avatarUrl,
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(updateUserProfile({ userId: updatedProfile._id, ...data }));
    navigate("/my-profile");
  };
  const handleCancelClick = () => {
    reset();
    navigate("/my-profile");
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
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} xl={5}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <FUploadAvatar
                    name="avatarUrl"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          my: 2,
                          mx: "auto",
                          display: "block",
                          textAlign: "center",
                          color: "text.secondary",
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fSize(3145728)}
                      </Typography>
                    }
                  />
                </Card>
              </Grid>

              <Grid item xs={12} xl={7}>
                <Card sx={{ height: "100%", p: 3 }}>
                  <Stack spacing={1}>
                    <FormLabel>User Name</FormLabel>
                    <FTextField name="userName" />

                    <FormLabel>Gender</FormLabel>
                    <FRadioGroup
                      name="gender"
                      options={["Male", "Female", "Other"]}
                    />

                    <Stack spacing={1}>
                      <FormLabel>Birthday</FormLabel>
                      <FBasicDatePicker name="birthday" />
                    </Stack>

                    <FormLabel>Phone</FormLabel>
                    <FTextField name="phone" />
                    <FormLabel>Address</FormLabel>
                    <FTextField name="address" />
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 3 }}
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
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      )}
    </Container>
  );
}

export default UpdateMyProfilePage;
