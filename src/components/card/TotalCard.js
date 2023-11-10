import { useTheme } from "@emotion/react";
import { Card, Typography, useMediaQuery } from "@mui/material";
import React from "react";

function TotalCard({ title, number, sx, children }) {
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const isXlDown = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Card
      sx={{
        ...sx,
        p: 1,
        m: isLgDown ? 1 : 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: theme.palette.mode === "dark" ? "white" : "primary.darker",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        height: isLgDown ? "90%" : "100%",
      }}
    >
      <Typography variant={isLgDown ? "h6" : isXlDown ? "h6" : "h5"}>
        {title}
      </Typography>
      <Typography variant={isLgDown ? "h5" : isXlDown ? "h5" : "h4"}>
        {number}
      </Typography>
      {children}
    </Card>
  );
}

export default TotalCard;
