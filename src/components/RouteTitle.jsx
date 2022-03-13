import React from "react";
import { Grid, Typography, Avatar } from "@mui/material";

const RouteTitle = ({ title, icon }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      columnSpacing={2}
      sx={{ marginTop: "1rem" }}
    >
      <Grid item>
        <Avatar alt="icon" src={icon} variant="square" />
      </Grid>
      <Grid item>
        <Typography variant="h6">{title.toUpperCase()}</Typography>
      </Grid>
    </Grid>
  );
};

export default RouteTitle;
