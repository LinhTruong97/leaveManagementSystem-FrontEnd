import React from "react";
import { useForm } from "react-hook-form";
import FormProvider from "../../../../components/form/FormProvider";
import {
  Box,
  Button,
  InputLabel,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FSelect from "../../../../components/form/FSelect";
import {
  LEAVE_CATEGORY_OPTIONS,
  LEAVE_STATUS_OPTIONS,
} from "../../../../variables/constants";
import { toPascalCase } from "../../../../utils/stringFormat";

function RequestFilter({ setFilter }) {
  const theme = useTheme();

  const methods = useForm();

  const { reset, handleSubmit } = methods;

  const handleClearClick = () => {
    reset();
    setFilter({});
  };
  const onSubmit = (query) => {
    setFilter(query);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={2}
        my={1}
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <InputLabel size="normal">Status</InputLabel>
          <FSelect
            name="status"
            sx={{ width: "100%", maxWidth: "150px", alignSelf: "center" }}
            defaultValue=""
          >
            <option key="All" value="">
              All
            </option>
            {LEAVE_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {toPascalCase(option)}
              </option>
            ))}
          </FSelect>
          <InputLabel size="normal">Category</InputLabel>
          <FSelect
            name="category"
            defaultValue=""
            sx={{ width: "100%", maxWidth: "150px", alignSelf: "center" }}
          >
            <option key="All" value="">
              All
            </option>
            {LEAVE_CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {toPascalCase(option)}
              </option>
            ))}
          </FSelect>
        </Stack>

        <Stack
          direction={{ xs: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            size="large"
            variant={theme.palette.mode === "dark" ? "contained" : "outlined"}
            type="submit"
            sx={{
              color: theme.palette.mode === "dark" ? "white" : "primary.main",
            }}
          >
            Search
          </Button>
          <Button
            size="large"
            variant={theme.palette.mode === "dark" ? "contained" : "outlined"}
            sx={{
              color: theme.palette.mode === "dark" ? "white" : "primary.main",
            }}
            onClick={handleClearClick}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default RequestFilter;
