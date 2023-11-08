import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { toPascalCase } from "../../utils/stringFormat";

function FAutocomplete({
  name,
  label,
  options,
  style,
  defaultValue,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || null}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          key={options}
          options={options}
          getOptionLabel={(option) =>
            `${option.fullName} - ${toPascalCase(option.role.name)}`
          }
          style={style}
          renderInput={(params) => <TextField {...params} label={label} />}
          onChange={(_, data) => field.onChange(data)}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          value={defaultValue}
        />
      )}
    />
  );
}

export default FAutocomplete;
