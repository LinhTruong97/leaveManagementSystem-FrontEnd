import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Container,
  InputLabel,
  Stack,
  Typography,
  alpha,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoadingScreen from "../../../components/LoadingScreen";
import {
  FBasicDatePicker,
  FRadioGroup,
  FSelect,
  FTextField,
  FormProvider,
} from "../../../components/form";
import { LEAVE_CATEGORY_OPTIONS } from "../../../variables/constants";
import { toPascalCase } from "../../../utils/stringFormat";
import dayjs from "dayjs";
import { updateLeave } from "./myLeaveSlice";
import { useNavigate } from "react-router-dom";

const yupSchema = yup.object().shape({
  categoryName: yup.string().notOneOf([""], "Leave category is required"),
  fromDate: yup
    .date()
    .typeError("Wrong date type")
    .required("From date is required"),
  toDate: yup.date().typeError("Wrong date type"),
  reason: yup.string().required("Reason is required"),
});

function UpdateLeaveForm({ selectedRequest }) {
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.myLeave);
  const defaultValues = {
    categoryName: selectedRequest?.category.name || "",
    fromDate: dayjs(selectedRequest?.fromDate) || dayjs(new Date()),
    toDate: selectedRequest?.toDate
      ? dayjs(selectedRequest?.toDate)
      : dayjs(selectedRequest?.fromDate),
    type: selectedRequest?.type || "full",
    reason: selectedRequest?.reason || "",
  };
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateLeave({ requestId: selectedRequest?._id, ...data })).then(
      () => reset()
    );
    navigate("/my-leaves");
  };

  const handleCancelClick = () => {
    reset();
    navigate("/my-leaves");
  };
  const selectedType = watch("type");

  return (
    <Container sx={{ position: "relative", mt: 2 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ width: "100%", m: "2rem auto", p: 4 }}>
              <Stack spacing={2}>
                <Typography variant="h5" textAlign="center">
                  UPDATE LEAVE FORM
                </Typography>
                <Stack>
                  <InputLabel size="normal" sx={{ mb: 1.5 }}>
                    Leave Category*
                  </InputLabel>
                  <FSelect
                    name="categoryName"
                    sx={{ width: "100%", alignSelf: "center" }}
                    defaultValue={selectedRequest?.category.name}
                  >
                    <option key="none" value="">
                      Please select category
                    </option>

                    {LEAVE_CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {toPascalCase(option)}
                      </option>
                    ))}
                  </FSelect>
                </Stack>

                <Stack>
                  <InputLabel size="normal" sx={{ mb: 1.5 }}>
                    Type Leave*
                  </InputLabel>
                  <FRadioGroup
                    name="type"
                    options={["full", "half_morning", "half_afternoon"]}
                  />
                </Stack>

                {selectedType === "full" ? (
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    justifyContent="space-between"
                  >
                    <Stack>
                      <InputLabel size="normal" sx={{ mb: 1.5 }}>
                        From Date*
                      </InputLabel>
                      <FBasicDatePicker name="fromDate" disablePast />
                    </Stack>
                    {selectedType === "full" && (
                      <Box>
                        <InputLabel size="normal" sx={{ mb: 1.5 }}>
                          To Date*
                        </InputLabel>
                        <FBasicDatePicker name="toDate" disablePast />
                      </Box>
                    )}
                  </Stack>
                ) : (
                  <Stack>
                    <InputLabel size="normal" sx={{ mb: 1.5 }}>
                      Date*
                    </InputLabel>
                    <FBasicDatePicker name="fromDate" disablePast />
                  </Stack>
                )}
                <Stack>
                  <InputLabel size="normal" sx={{ mb: 1.5 }}>
                    Reason*
                  </InputLabel>
                  <FTextField
                    name="reason"
                    multiline
                    fullWidth
                    rows={2}
                    placeholder="Type here ..."
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                </Stack>

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
                    Save
                  </LoadingButton>
                  <Button variant="contained" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </Card>
          </FormProvider>
        </Box>
      )}
    </Container>
  );
}

export default UpdateLeaveForm;
