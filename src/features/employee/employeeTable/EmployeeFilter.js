import React from "react";
import { useForm } from "react-hook-form";

import { Box, Button, Stack } from "@mui/material";
import FSelect from "../../../components/form/FSelect";
import { EMPLOYEE_ROLE_OPTIONS } from "../../../variables/constants";
import { toPascalCase } from "../../../utils/stringFormat";
import FTextField from "../../../components/form/FTextField";
import FormProvider from "../../../components/form/FormProvider";

function EmployeeFilter({ filter, setFilter }) {
  const methods = useForm();

  const { reset, handleSubmit } = methods;

  const handleClearClick = () => {
    reset();
    setFilter({ ...filter, role: "", fullName: "" });
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setFilter({ ...filter, fullName: searchValue });
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          alignItems: "center",
          m: 2,
        }}
      >
        <FTextField
          name="fullName"
          label="Search by name"
          value={filter.fullName}
          sx={{ width: "400px" }}
          onChange={handleSearchChange}
        />
        <Stack direction="row" spacing={3}>
          <FSelect
            name="role"
            defaultValue=""
            label="Role"
            sx={{ width: "100%", maxWidth: "150px", alignSelf: "center" }}
            onChange={(event) =>
              setFilter({ ...filter, role: event.target.value })
            }
          >
            <option value="" />
            {EMPLOYEE_ROLE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {toPascalCase(option)}
              </option>
            ))}
          </FSelect>

          <Button onClick={handleClearClick} variant="outlined" size="large">
            Clear
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default EmployeeFilter;
