import { IconButton } from "@mui/material";
import React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

function RejectIcon({ sx, handleClickReject }) {
  return (
    <IconButton color="error" onClick={handleClickReject}>
      <CancelRoundedIcon sx={sx} />
    </IconButton>
  );
}

export default RejectIcon;
