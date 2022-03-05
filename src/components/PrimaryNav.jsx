import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const PrimaryNav = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography varaint="h4">Solar app sizing for homes</Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default PrimaryNav;
