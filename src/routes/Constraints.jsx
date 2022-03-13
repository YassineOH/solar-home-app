import React from "react";
import { Grid } from "@mui/material";

import { NavigationButtons, CardShow, RouteTitle } from "../components";

import offgrid from "../assets/offgrid.png";
import ongrid from "../assets/ongrid.png";
import icon from "../assets/gridSolar.png";

const Constraints = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-evenly"
      rowSpacing={2}
      sx={{ minHeight: "90vh", marginTop: "1rem" }}
    >
      <Grid item>
        <RouteTitle icon={icon} title="mode of the installation" />
      </Grid>
      <Grid item>
        <CardShow
          image={ongrid}
          type="on-Grid"
          text="Consume the solar power directly without stocking, recommended for
              urban zones."
        />
      </Grid>
      <Grid item>
        <CardShow
          image={offgrid}
          type="off-Grid"
          text="Consume and stock the solar energy without connecting with grid, recommended for rural zones."
        />
      </Grid>
      <Grid item sx={{ width: "90vw" }}>
        <NavigationButtons
          nextPage="results"
          prevPage="PowerConsumption"
          goToNext={true}
        />
      </Grid>
    </Grid>
  );
};

export default Constraints;
