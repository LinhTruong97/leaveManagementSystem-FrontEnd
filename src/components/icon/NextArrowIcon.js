import { IconButton } from "@mui/material";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function NextArrowIcon(props) {
  return (
    <IconButton onClick={props.onClick} disableRipple>
      <ArrowCircleRightIcon sx={{ fontSize: "30px" }} />
    </IconButton>
  );
}

export default NextArrowIcon;
