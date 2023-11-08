import { Card, Typography } from "@mui/material";
import React from "react";

function TotalCard({ title, number, sx, children }) {
  return (
    <Card sx={sx}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{number}</Typography>
      {children}
    </Card>
  );
}

export default TotalCard;
