import React from "react";
import { CircularProgress, Dialog, Grid } from "@mui/material";

const WaitingProgress = ({ text }) => {
  return (
    <Dialog open={true}>
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="space-around"
        sx={{ width: "70vw", height: "20vh" }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
        <Grid item>{text}</Grid>
      </Grid>
    </Dialog>
  );
};

export default WaitingProgress;
