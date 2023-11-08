import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormHelperText } from "@mui/material";

function FBasicDatePicker({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      defaultValue={dayjs(new Date())}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(value) || null}
              onChange={(date) => {
                onChange(date?.isValid ? date : null);
              }}
              format="DD/MM/YYYY"
              sx={{ width: "100%" }}
              {...other}
            />
          </LocalizationProvider>
          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}

export default FBasicDatePicker;
