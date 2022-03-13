import React from "react";
import { Grid, Typography, Paper } from "@mui/material";

import myStyles from "./style";

const ResultCard = ({ value, textValue, icon, unit }) => {
  const style = myStyles();
  return (
    <Paper sx={style.resultCard}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-around"
        sx={{ marginBottom: ".5rem" }}
      >
        <Typography variant="subtitle1">{textValue.toUpperCase()}</Typography>
      </Grid>
      <Grid container alignItems="center" justifyContent="space-around">
        <Grid item xs={4}>
          <img src={icon} alt="res" style={{ height: "75px" }} />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "2rem" }}>{value}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ fontSize: "1.5rem" }}>
          {unit}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultCard;
