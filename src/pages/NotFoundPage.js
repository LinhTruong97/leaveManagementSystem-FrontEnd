import { Grid, Typography } from "@mui/material";
import React from "react";

function NotFoundPage() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <Typography variant="h4" align="center">
          404 Not Found
        </Typography>
        <Typography variant="body1" align="center">
          Sorry, the page you are looking for does not exist.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NotFoundPage;
