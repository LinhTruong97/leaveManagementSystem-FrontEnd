import { IconButton, useTheme } from "@mui/material";
import React from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function PrevArrowIcon(props) {
  const theme = useTheme();

  return (
    <IconButton onClick={props.onClick} disableRipple>
      <ArrowCircleLeftIcon
        sx={{
          fontSize: "30px",
          color:
            theme.palette.mode === "dark" ? "primary.light" : "primary.main",
        }}
      />
    </IconButton>
  );
}

export default PrevArrowIcon;
