import { IconButton } from "@mui/material";
import React from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function PrevArrowIcon(props) {
  return (
    <IconButton onClick={props.onClick} disableRipple>
      <ArrowCircleLeftIcon sx={{ fontSize: "30px" }} />
    </IconButton>
  );
}

export default PrevArrowIcon;
