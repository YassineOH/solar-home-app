import React from "react";
import { Button, Grid } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

const NavigationButtons = ({ nextPage, prevPage }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Button
          variant="outlined"
          component={Link}
          to={`/${prevPage}`}
          startIcon={<ChevronLeftIcon />}
        >
          Prev
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          component={Link}
          to={`/${nextPage}`}
          endIcon={<ChevronRightIcon />}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavigationButtons;
