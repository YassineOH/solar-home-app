import React from "react";
import { Typography, Grid } from "@mui/material";

import {
  EstimatedPowerConsumption,
  MonthlyConsumption,
  NavigationButtons,
} from "../components/index";

const PowerConsumption = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-around"
      style={{ minHeight: "90vh" }}
    >
      <Grid item>
        <Typography variant="h4" align="center" sx={{ marginTop: "1rem" }}>
          power consumption
        </Typography>
      </Grid>
      <Grid item>
        <EstimatedPowerConsumption />
      </Grid>
      <Grid item>
        <MonthlyConsumption />
      </Grid>
      <Grid item sx={{ width: "90vw" }}>
        <NavigationButtons nextPage="Constraints" prevPage="geoposition" />
      </Grid>
    </Grid>
  );
};

export default PowerConsumption;
