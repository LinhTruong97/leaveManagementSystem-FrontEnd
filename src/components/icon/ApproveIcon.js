import { IconButton } from "@mui/material";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function ApproveIcon({ sx, handleClickApprove }) {
  return (
    <IconButton color="success" onClick={handleClickApprove}>
      <CheckCircleRoundedIcon sx={sx} />
    </IconButton>
  );
}

export default ApproveIcon;
