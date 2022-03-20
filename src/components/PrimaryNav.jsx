import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Avatar,
  Switch,
} from "@mui/material";
import { createTheme } from "@mui/system";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { modeActions } from "../app/store";
import { lightTheme, darkTheme } from "../app/themes";

import myStyles from "../components/style";
import imgLogo from "../assets/sun.png";

const PrimaryNav = () => {
  const theme = createTheme(useSelector((state) => state.mode.mode));
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.checked) {
      dispatch(modeActions.setLightTheme(lightTheme));
    } else {
      dispatch(modeActions.setDarkTheme(darkTheme));
    }
  };

  const style = myStyles(theme);
  return (
    <>
      <AppBar sx={style.appBar} color="transparent" position="relative">
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
              <Switch defaultChecked onChange={handleChange} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default PrimaryNav;
