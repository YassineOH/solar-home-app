import React from "react";
import { AppBar, Typography, Toolbar, Grid, Button } from "@mui/material";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        style={{ height: "90vh" }}
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item>
          <Typography variant="h2" component="h1" align="center">
            Size your photovoltaic installation now.
          </Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to="/geoposition" variant="contained">
            Start Now
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
