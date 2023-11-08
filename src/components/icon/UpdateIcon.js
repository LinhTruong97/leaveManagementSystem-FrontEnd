import { IconButton } from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

function UpdateIcon({ sx }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/my-profile/update-profile");
  };

  return (
    <IconButton onClick={handleClick}>
      <SettingsIcon sx={sx} />
    </IconButton>
  );
}

export default UpdateIcon;
