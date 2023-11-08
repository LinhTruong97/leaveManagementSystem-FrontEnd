import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FSelect({ name, defaultValue, children, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div>
          <TextField
            {...field}
            select
            fullWidth
            SelectProps={{ native: true }}
            error={!!error}
            helperText={error?.message}
            {...other}
          >
            {children}
          </TextField>
        </div>
      )}
    />
  );
}

export default FSelect;
