import React from "react";
import { useForm } from "react-hook-form";

import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import FSelect from "../../../components/form/FSelect";
import {
  EMPLOYEE_ROLE_OPTIONS,
  EMPLOYEE_STATUS_OPTIONS,
} from "../../../variables/constants";
import { toPascalCase } from "../../../utils/stringFormat";
import FTextField from "../../../components/form/FTextField";
import FormProvider from "../../../components/form/FormProvider";

function EmployeeFilter({ filter, setFilter }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const methods = useForm();

  const { reset, handleSubmit } = methods;

  const handleClearClick = () => {
    reset();
    setFilter({ ...filter, role: "", fullName: "", status: "" });
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
      <Stack
        direction={{ lg: "row", xs: "column" }}
        spacing={4}
        m={2}
        alignItems="center"
      >
        <FTextField
          name="fullName"
          label="Search by name"
          value={filter.fullName}
          sx={{ minWidth: "200px" }}
          onChange={handleSearchChange}
        />

        <Stack direction={{ sm: "row", xs: "column" }} spacing={3}>
          <Stack direction="column" spacing={3}>
            <FSelect
              name="role"
              defaultValue=""
              label="Role"
              sx={{ minWidth: 50, alignSelf: "center" }}
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

            {!isSm && (
              <FSelect
                name="status"
                defaultValue=""
                label="Status"
                sx={{ minWidth: 50, alignSelf: "center" }}
                onChange={(event) =>
                  setFilter({ ...filter, status: event.target.value })
                }
              >
                <option value="" />

                {EMPLOYEE_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {toPascalCase(option)}
                  </option>
                ))}
              </FSelect>
            )}
          </Stack>
          <Button
            onClick={handleClearClick}
            variant={theme.palette.mode === "dark" ? "contained" : "outlined"}
            size="large"
            sx={{
              color: theme.palette.mode === "dark" ? "white" : "primary.main",
            }}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}

export default EmployeeFilter;
