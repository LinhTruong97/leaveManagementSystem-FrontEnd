import { IconButton, useTheme } from "@mui/material";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function NextArrowIcon(props) {
  const theme = useTheme();

  return (
    <IconButton onClick={props.onClick} disableRipple>
      <ArrowCircleRightIcon
        sx={{
          fontSize: "30px",
          color:
            theme.palette.mode === "dark" ? "primary.light" : "primary.main",
        }}
      />
    </IconButton>
  );
}

export default NextArrowIcon;
