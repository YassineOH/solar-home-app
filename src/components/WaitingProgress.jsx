import React from "react";
import { CircularProgress, Dialog, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const WaitingProgress = ({ text, error }) => {
  return (
    <Dialog open={true}>
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="space-around"
        sx={{ width: "min(70vw, 300px) ", height: "20vh" }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
        <Grid item>{text}</Grid>
        {error && (
          <Grid item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="error" fullWidth>
                go to home
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
};

export default WaitingProgress;
