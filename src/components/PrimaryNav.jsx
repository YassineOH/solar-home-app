import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  Switch,
} from "@mui/material";
import { Outlet } from "react-router-dom";

import myStyles from "../components/style";
import imgLogo from "../assets/sun.png";

const PrimaryNav = () => {
  const style = myStyles();
  return (
    <>
      <AppBar sx={style.appBar} color="transparent" position="static">
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
          >
            <Grid item xs={2}>
              <Avatar alt="icon" src={imgLogo} />
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="subtitle2"
                sx={{ textTransform: "uppercase" }}
              >
                Solar app
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Switch defaultChecked />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default PrimaryNav;
