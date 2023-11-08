import React from "react";
import { useForm } from "react-hook-form";
import FormProvider from "../../../../components/form/FormProvider";
import { Box, Button, InputLabel, Stack } from "@mui/material";
import FSelect from "../../../../components/form/FSelect";
import {
  LEAVE_CATEGORY_OPTIONS,
  LEAVE_STATUS_OPTIONS,
} from "../../../../variables/constants";
import { toPascalCase } from "../../../../utils/stringFormat";
import { useNavigate } from "react-router-dom";

function RequestFilter({ setFilter }) {
  const methods = useForm();
  const navigate = useNavigate();

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
          p: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate("/my-leaves/apply-leave");
          }}
          sx={{ my: 1, mx: 2 }}
        >
          + Apply New Leave
        </Button>
        <Stack direction="row" alignItems="center" spacing={2}>
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
          <Button size="large" variant="outlined" type="submit">
            Search
          </Button>
          <Button size="large" variant="outlined" onClick={handleClearClick}>
            Clear
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default RequestFilter;
