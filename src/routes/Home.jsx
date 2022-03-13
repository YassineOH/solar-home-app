import React from "react";
import { Typography, Grid, Button } from "@mui/material";

import { Link } from "react-router-dom";

import homeImg from "../assets/house.png";

import myStyles from "../components/style";

const Home = () => {
  const style = myStyles();
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
          <Typography variant="h3" component="h1" align="center">
            Size your photovoltaic installation.
          </Typography>
        </Grid>
        <Grid item sx={style.imgHome}>
          <img src={homeImg} style={{ width: "100%" }} alt="home" />
        </Grid>
        <Grid item>set your langugae</Grid>

        <Grid item>
          <Button
            component={Link}
            sx={style.mainButton}
            to="/geoposition"
            variant="contained"
          >
            Start Now
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
