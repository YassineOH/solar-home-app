import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";

import myStyles from "./style";

const ResultCard = ({ value, textValue, icon, unit }) => {
  const theme = createTheme(useSelector((state) => state.mode.mode));

  const style = myStyles(theme);
  return (
    <Paper sx={style.resultCard}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-around"
        sx={{ marginBottom: ".5rem" }}
      >
        <Typography variant="subtitle1" gutterBottom>
          {textValue.toUpperCase()}
        </Typography>
      </Grid>
      <Grid container alignItems="center" justifyContent="space-around">
        <Grid item xs={3}>
          <img src={icon} alt="res" style={{ height: "75px", width: "75px" }} />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "2rem", textAlign: "center" }}>
            {value}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ fontSize: "1.5rem" }}>
          {unit}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultCard;
